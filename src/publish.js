const _  = require('lodash/fp');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const toTitleCase = require('titlecase');

const TEMPLATE_PATH = path.join(__dirname, 'README.template.md');
const OUTPUT_PATH = path.join(__dirname, '..', 'README.md');
const SURVEYS_PATH = path.join(__dirname, 'published.yaml');
const SEARCH_DOMAIN = 'https://scholar.google.com';

let surveys = yaml.safeLoad(fs.readFileSync(SURVEYS_PATH));

let data = _.flow(
    // Sort surveys by citation per year.
    _.orderBy(awesomeness, 'desc'),
    // Correctly camel-case authors and titles.
    _.forEach(o => {
        o.author = toGoogleAuthorCase(o.author);
        o.name = toTitleCase(o.name);
    }),
    // One-to-many grouping by category.
    _.transform((result, survey) => {
        survey.categories.forEach(category => {
            category = toTitleCase(category);
            result[category] = (result[category] || []).concat(survey);
        })
    }, {}),
    // Sort category groups by category name.
    _.toPairs,
    _.sortBy('[0]'),
    // Group categories by the first category latter.
    _.groupBy(([category, ]) => category[0]),
    _.mapValues(_.fromPairs)
)(surveys);

function searchUrl(survey) {
    let { name, author, citation} = survey;

    // We need to escape "(" and ")" in urls for markdown.
    return `${SEARCH_DOMAIN}/scholar?q=${encodeURIComponent(
        `"${name}" author:"${author.split(',')[0]}"`
    ).replace(/\(/g, "%28").replace(/\)/g, "%29")}`;
}

function awesomeness(survey) {
    let { count, from, to} = survey.citation;
    return count / (Math.pow(to - from, 3) + 1) * 2
}

function rating(survey) {
    return _.repeat(Math.round(awesomeness(survey)).toString().length - 1, '⭐');
}

function toGoogleAuthorCase(authors) {
    return authors.split(',').map(author => {
        let parts = author.split(' ');
        return _.initial(parts)
            .map(_.upperCase)
            .concat(_.capitalize(_.last(parts)))
            .join(' ')
    }).join(',');
}

let compiled = _.template(fs.readFileSync(TEMPLATE_PATH));
fs.writeFileSync(OUTPUT_PATH, compiled({ data,  searchUrl, rating}));
