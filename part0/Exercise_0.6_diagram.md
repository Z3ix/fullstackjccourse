
```mermaid
    sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server

    Note right of browser: Clientside script inserts new entry in browser without waiting server response.

    server-->>browser: Json file
    deactivate server

    Note right of browser: Recieves fresh note list.
   

    