<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}" />
        <title>Angular App</title>
        <script>
            location.hash === '' ? location.href = '/#!/' : '';
        </script>
    </head>

    <body ng-app="app">

        {{--Header--}}
        <header  ui-view="header"></header>

        {{--Content--}}
        <div class="container">
            <section ui-view="content" class="mt-5"></section>
        </div>


        {{--Footer--}}
        <footer  ui-view="footer"></footer>


        <script
                src="https://code.jquery.com/jquery-3.3.1.min.js"
                integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
                crossorigin="anonymous"></script>
        <script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="{{ asset('build/angular.js') }}"></script>
        <script type="text/javascript" src="{{ asset('build/app.js') }}"></script>
    </body>
</html>