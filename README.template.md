# Machine Learning Surveys

## Table of Contents

<% _(data).keys().each((letter) => {
    _(data[letter]).keys().each((category) => {%><%=

`- [${category}](#${category.split(' ').join('-')})\n`

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
