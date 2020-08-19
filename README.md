# Entertainme

Entertainme is an app that can make you explore more about Movies & TV Series.
This app allows you to create your desired Movie & TV Series, update and delete it,
plus you also can add it to your favorites list.

There are 3 servers in this app with the purpose to analyze the differences in terms of speed time request,
between casual API request and Cache request. The technologies used in this app:

Server:
- expressApp (Movie & TV Series): Node JS, Express JS, MongoDB (Join Database)
- Services (Movie & TV Series) server 3001 & 3002: Node JS, Express JS, MongoDB (Separate Database)
- Orchestrator (Movies & TV Series): Node JS, Express JS, Redis, Apollo Server, Graphql

Client:
- React JS
- Apollo Graph-QL Client
- InMemoryCache Apollo Client
- Sweetalert Library