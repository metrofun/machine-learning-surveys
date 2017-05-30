<!--
    This is an auto-generated file. Please check "How to Contribute" wiki
    here: https://github.com/metrofun/machine-learning-surveys/wiki/How-to-Contribute
-->
# Machine Learning Surveys

A curated list of Machine Learning related surveys, overviews and books.

If you want to contribute to this list (please do), check [How to Contribute](https://github.com/metrofun/machine-learning-surveys/wiki/How-to-Contribute-a-Paper) wiki or contact me [@MeTroFuN](https://twitter.com/MeTroFuN).

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

`* [${survey.name}](${searchUrl(survey)} "${survey.author}") (${survey.year})
[${survey.author}] [${survey.pages}pp] ${survey.book ? ' 📚':''} ${rating(survey)}\n`

        %><% });
    });
});%>
