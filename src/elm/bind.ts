import { NotificationService } from '../shared/notification.service'

const notes = new NotificationService

const Elm = require( '../elm/Main' )

module.exports = function BindElm (element) {
  // inject bundled Elm app into div#main
  const app = Elm.Main.embed( element )

  app.ports.check.subscribe((word) => {
    let suggestions = [word, word + '!']
    app.ports.suggestions.send(suggestions)
  })

  app.ports.send.subscribe((word) => {
    notes.send(word)
  })

  return app
}

