/-  spider
/+  strand=strand:spider, octs, base64
=/  api-key  (need (scot %tas %openai-api-key))
=/  api-url  "https://api.openai.com/v1/engines/davinci-codex/completions"
=/  prompt  "Write a simple Python function to add two numbers."
=,  strand
^-  thread:spider
|=  arg=vase
=/  req  (request-text prompt)
;<  ~  bind:m  (send-json-request api-url req)
=<  ~  bind:m  (parse-response)
|_  ~
++  send-json-request
  |=  [url=tape payload=(cask json)]
  ^-  (strand ,json)
  =/  headers
    :~  ["content-type" "application/json"]
    ["authorization" (cat 3 "Bearer " api-key)]
  =/  chart  (need (de-purl:html url))
  ;<  ~  bind:m  (sail chart)
  ;<  ~  bind:m  (fetch-headers headers)
  ;<  ~  bind:m  (send-payload payload)
  (parse-response)
++  parse-response
  ^-  (strand ,json)
  ;<  data=mimes:html  bind:m  take-mimes
  =/  txt  (as-octs:mimes data)
  ?~  txt  (strand-fail %no-data ~)
  (strand-pass (de-json:html (need (de-base64:html (need u.txt)))))
++  request-text
  |=  text=tape
  ^-  (cask json)
  =/  data  *json
  (~(put by data) 'prompt' (tape-to-json text))
  (~(put by data) 'max_tokens' (numb-to-json 50))
  (~(put by data) 'n' (numb-to-json 1))
  (~(put by data) 'stop' (list-to-json ~['\n']))
  (bex:html data)
--
