::
|_  bowl:gall
++  leeches                        (p (set ship) /leeches)
++  targets  |=  list=@ta          (p (set ship) %targets ?~(list / /[list]))
++  mutuals  |=  list=@ta          (p (set ship) %mutuals ?~(list / /[list]))
++  leeche   |=  =ship             (p _| /leeches/(scot %p ship))
++  target   |=  [list=@ta =ship]  (p _| /mutuals/[list]/(scot %p ship))
++  mutual   |=  [list=@ta =ship]  (p _| /mutuals/[list]/(scot %p ship))
++  online   |=  =ship             (s _| /online/(scot %p ship))
++  requests                       (s (set ship) /requests)
++  charted  |=  list=@ta          (s (set ship) %charted ?~(list / /[list]))
++  convoy   |=  list=@ta          (s (set ship) %convoy ?~(list / /[list]))
++  request  |=  =ship             (s _| /request/(scot %p ship))
++  chart    |=  [list=@ta =ship]  (s _| /convoy/[list]/(scot %p ship))
++  tanker   |=  [list=@ta =ship]  (s _| /convoy/[list]/(scot %p ship))
::
++  pals     ~+  /(scot %p our)/pals/(scot %da now)
++  boat     ~+  /(scot %p our)/boat/(scot %da now)
++  running  ~+  .^(? %gu pals)
++  sailing  ~+  .^(? %gu boat)
::
++  p
  |*  [=mold =path]  ~+
  ?.  running  *mold
  .^(mold %gx (weld pals (snoc `^path`path %noun)))
::
++  s
  ::
  |*  [=mold =path]  ~+
  ?.  sailing  *mold
  .^(mold %gx (weld boat (snoc `^path`path %noun)))
--
