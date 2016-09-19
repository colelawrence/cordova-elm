port module Main exposing (..)

import Html exposing (..)
import Html.App as App
import Html.Events exposing (..)
import String


-- import Html.Attributes exposing (..)


main : Program Never
main =
    App.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias Model =
    { word : String
    , message : String
    , suggestions : List String
    }


init : ( Model, Cmd Msg )
init =
    ( Model "" "" [], Cmd.none )



-- UPDATE


type Msg
    = Change String
    | Check
    | Suggest (List String)
    | ChangeMessage String
    | SendMessage


port check : String -> Cmd msg


port send : String -> Cmd msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Change newWord ->
            ( Model newWord model.message [], Cmd.none )

        SendMessage ->
            ( { model | message = "" }, send model.message )

        ChangeMessage newMessage ->
            { model | message = newMessage }
                ! []

        Check ->
            ( model, check model.word )

        Suggest newSuggestions ->
            ( Model model.word model.message newSuggestions, Cmd.none )



-- SUBSCRIPTIONS


port suggestions : (List String -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions model =
    suggestions Suggest



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ input [ onInput Change ] []
        , button [ onClick Check ] [ text "Check" ]
        , div [] [ text (String.join ", " model.suggestions) ]
        , br [] []
        , input [ onInput ChangeMessage ] []
        , button [ onClick SendMessage ] [ text "Send Notification" ]
        ]
