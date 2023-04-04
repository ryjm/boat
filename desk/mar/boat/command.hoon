::  boat-command: friend management
::
/-  *boat
::
|_  cmd=command
++  grad  %noun
++  grow
  |%
  ++  noun  cmd
  --
++  grab
  |%
  ++  noun  command
  ++  json
    ^-  $-(^json command)
    ~&  >>  %json
    =,  dejs:format
    |^  (of tack+arg veer+arg sail+arg moor+arg ~)
    ++  arg
      (ot 'ship'^(su fed:ag) 'in'^(as so) ~)
    --
  --
--
