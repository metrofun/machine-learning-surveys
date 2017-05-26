# Machine Learning Surveys

A curated list of Machine Learning related surveys, overviews and books.

If you want to contribute to this list (please do), send me a pull request or contact me [@MeTroFuN](https://twitter.com/MeTroFuN).

## Table of Contents

<% _(data).keys().each((letter) => {
    _(data[letter]).keys().each((category) => {%><%=

`- [${category}](#${category.split(' ').join('-').toLowerCase()})\n`

    %><% });
});%>
<% _(data).keys().each((letter) => {
    _(data[letter]).keys().each((category) => {%><%=

`\n### ${category}\n\n`

        %><%_(data[letter][category]).each((survey) => {%><%=

`* [${survey.name}](${searchUrl(survey)} "${survey.author}")\
 [${survey.author}] [${survey.year}] ${survey.book ? ' 📚':''} ${awesomeness(survey)}\n`

        %><% });
    });
});%>
