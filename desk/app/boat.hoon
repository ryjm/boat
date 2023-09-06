/-  *boat
/+  rudder, dbug, verb, default-agent, boat
::
/~  pages  (page:rudder harbor command)  /app/boat/webui
::
|%
+$  state-0  [%0 harbor]
::
+$  eyre-id  @ta
+$  card  card:agent:gall
+$  gift  gift:agent:gall
+$  note  note:agent:gall
  :: $%  [%agent [ship %boat] task:agent:gall]
  ::     [%arvo %e %connect [~ %boat ~] term]
  :: ==
--
::
=|  state-0
=*  state  -
::
%-  agent:dbug
%+  verb  &
^-  agent:gall
::
=<
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
::
++  on-init
  ^-  (quip card _this)
  =^  cards  this
    (on-poke %boat-command !>(`command`[%tack ~middev ~]))
  =-  [[- cards] this]
  [%pass /eyre/connect %arvo %e %connect [~ /[dap.bowl]] dap.bowl]
::
++  on-save  !>(state)
::
++  on-load
  |=  ole=vase
  ^-  (quip card _this)
  =/  old=state-0  !<(state-0 ole)
  [~ this(state old)]
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
    ::  %boat-command: local app control
    ::
    ?(%noun %boat-command)
    =+  (mule |.(!<(@tas vase)))
    =/  cmd=command
      ?-    -.-
        %.y  ;;(command [p ~])
        %.n   ;;(command !<(* vase))
      ==
    ?>  =(our src):bowl
    ?:  (~(has in in.cmd) ~.)
      ~|  [%illegal-empty-list-name in=-.cmd]
      !!
    ::
    =/  course=?  (~(has in convoy) ship.cmd)
    =/  alive=?  ?|  (~(has in online) ship.cmd)
                    &(=(our.bowl ship.cmd) boating)
                  ==
    =;  [yow=? =_radar =_online]
      ^-  (quip card _this)
      =?  boating  =(our.bowl ship.cmd)  ?:(?=(%sail -.cmd) & |)
      :_  this(radar.state radar, online.state online, boating.state boating)
      ?.  yow  ~
      ?.  ~(running boat bowl)  ((slog leaf+"%boat: %pals not running") ~)
      =+  .^(pals=(set @p) %gx /(scot %p our.bowl)/pals/(scot %da now.bowl)/mutuals/noun)
      =/  =gesture
        ?-  -.cmd
          %tack  [%ale ~]
          %veer  [%nap ~]
          %sail  [%liv ~]
          %moor  [%ded ~]
        ==
      ~&  [%sending-gesture gesture ship.cmd]
      =;  cards=(list card)
        ?.  ?=(?(%liv %ded) -.gesture)
          [%pass /[-.gesture] %agent [ship.cmd dap.bowl] %poke [%boat-gesture !>(gesture)]]~
        %+  welp  cards
        %+  turn  ~(tap in (~(int in pals) charted))
        |=  =ship
        [%pass /[-.gesture] %agent [ship dap.bowl] %poke [%boat-gesture !>(gesture)]]
      =/  =effect
        ?-  -.cmd
          %tack  [- ship]:cmd
          %veer  [- ship]:cmd
          %sail  [- ship]:cmd
          %moor  [- ship]:cmd
        ==
      =/  =cage     [%boat-effect !>(effect)]
      ~&  [%sending-effect effect]
      :~
        [%give %fact [/online]~ cage]
      ==
  ::
  ?-  -.cmd
      %sail
    =?  online  course  (~(put in online) ship.cmd)
    [!alive radar online]
    ::
      %moor
    =?  online  course  (~(del in online) ship.cmd)
    [alive radar online]
      %tack
    :-  !course
    :_  online
    %+  ~(put by radar)  ship.cmd
    =/  cum  *cummand
    =/  ino
      =<  ins  cum 
    %-  ~(uni in in.cmd)
    (~(gut by radar) ship.cmd ~)
  ::
      %veer
    ?:  =(~ in.cmd)
      ::  remove chart entirely
      ::
      [course (~(del by radar) ship.cmd) online]
    ::  remove from specified lists
    ::
    :-  |
    :_  online
    =.  radar
      =/  liz=(list @ta)  ~(tap in in.cmd)
      |-  ^+  radar
      ?~  liz  radar
      $(liz t.liz, radar (~(del ju radar) ship.cmd i.liz))
    =?  radar  !(~(has by radar) ship.cmd)
      (~(put by radar) ship.cmd ~)
    radar
  ==
  ::
    ::  %boat-gesture: foreign %boat signals
    ::
      %boat-gesture
    ?<  =(our src):bowl
    =*  ship  src.bowl
    =+  !<(=gesture vase)
    ?.  (~(has in convoy) ship)
      ~&  [%not-in-convoy ship]
      ?+    -.gesture  ~|([%uncharted-gesture gesture] !!)
        %ale  [~ this(sos.state (~(put in sos) ship))]
        %nap  [[[%give %kick ~[/online /convoy] `ship]]~ this(sos.state (~(del in sos) ship))]
      ==
      ::
    =/  [yow=? =_online]
    =*  has  (~(has in online) ship)
      ~&  >>  has+has
      ?+  -.gesture  [has online]
        %liv  :-  !has  (~(put in online) ship)
        %ded  :-   has  (~(del in online) ship)
      ==
     ~&  >>  online+online
    :_  this(online.state online)
    ^-  (list card)
    ?.  yow  ~
    :*  =/  =effect
          ?-  -.gesture
            %ale  [%chart ship]
            %nap  [%drift ship]
            %liv  [%sail ship]
            %ded  [%moor ship]
          ==
        =/  =cage    [%boat-effect !>(effect)]
        [%give %fact [/online]~ cage]
      ::
        ?.  .^(? %gu /(scot %p our.bowl)/hark/(scot %da now.bowl))  ~
        =/  body
          =-  [ship+ship - ~]
          ?-  -.gesture
            %ale  ' is requesting to join the convoy'
            %nap  ' no longer wishes to join the convoy'
            %liv  ' is now online'
            %ded  ' is now offline'
          ==
        =/  id      (end 7 (shas %boat-notification eny.bowl))
        =/  rope    [~ ~ q.byk.bowl /(scot %p ship)/[-.gesture]]
        =/  action  [%add-yarn & & id rope now.bowl body /boat ~]
        =/  =cage   [%hark-action !>(action)]
        [%pass /hark %agent [our.bowl %hark] %poke cage]~
    ==
  ::
    ::  %handle-http-request: sos from eyre
    ::
      %handle-http-request
    =;  out=(quip card _+.state)
      [-.out this(+.state +.out)]
    %.  [bowl !<(order:rudder vase) +.state]
    %-  (steer:rudder _+.state command)
    :^    pages
        (point:rudder /[dap.bowl] & ~(key by pages))
      (fours:rudder +.state)
    |=  cmd=command
    ^-  $@  brief:rudder
        [brief:rudder (list card) _+.state]
    =^  caz  this
      (on-poke %boat-command !>(cmd))
    ['charted!' caz +.state]
  ==
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+  path  (on-watch:def path)
    [%http-response *]  [~ this]
      [%online ~]
    =+  pals=.^((set @p) %gx /(scot %p our.bowl)/pals/(scot %da now.bowl)/mutuals/noun)
    :_  this
    %+  turn  ~(tap in (~(int in pals) convoy))
    |=  =ship
    =/  =effect  ?:(boating [%sail ship] [%moor ship])
    ~&  [%sending-effect effect]
    [%give %fact ~ %boat-effect !>(effect)]
  ::
      [%convoy ~]
    :_  this
    %+  turn  ~(tap in convoy)
    |=(=@p [%give %fact ~ %boat-effect !>(`effect`[%tack p])])
  ::
      [%radar ~]
    :_  this
    %+  turn  ~(tap in sos)
    |=(=@p [%give %fact ~ %boat-effect !>(`effect`[%chart p])])
  ==
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  =/  hearing=(set ship)           ::  all known subscriptions
    %-  ~(gas in *(set ship))
    %+  murn  ~(tap by wex.bowl)
    |=  [[=^wire =ship =term] [acked=? =path]]
    ^-  (unit ^ship)
    ~&  [%heard wire ship term path]
    ?.  ?=([%~.~ %boat ?(%convoy %online) @ ~] wire)  ~
    `ship
  ?+  wire  ~&([dap.bowl %strange-wire wire] [~ this])
      [%online ~]
     [~ this]
      [%hark ~]
    ?.  ?=(%poke-ack -.sign)  (on-agent:def wire sign)
    ?~  p.sign  [~ this]
    ((slog 'boat: failed to notify' u.p.sign) [~ this])
    ::
      [%boat ~]
    ?+  -.sign  (on-agent:def wire sign)
        %kick   [~ this]
        %watch-ack  [~ this]
        %fact
      =+  !<(=effect q.cage.sign)
      [~ this]
    ==
      ::
      [%ale ~]
    ?+  -.sign  (on-agent:def wire sign)
        %kick   [~ this]
        %watch-ack  [~ this]
        %fact
      =-  [- this]
      [%pass /boat [%agent [src.bowl dap.bowl] %watch /online]]~
    ==
    ::
      [%nap ~]
    =-  [- this]
    [%pass /boat [%agent [src.bowl dap.bowl] %leave ~]]~
    ::
      [%ded ~]
    :_  this
    ?.  =(our.bowl src.bowl)  ~
    =/  =cage  [%boat-effect !>(`effect`[%moor our.bowl])]
    [%give %fact [/online]~ cage]~
    ::
      [%liv ~]
    ?:  =(our.bowl src.bowl)
        :_  this
        =/  =cage  [%boat-effect !>(`effect`[%sail our.bowl])]
        [%give %fact [/online]~ cage]~
      =;  receipt
        ?:  (~(has in hearing) src.bowl)
          [~ this(receipts receipt)]
        :_  this(receipts receipt)
        ?.  (~(has in convoy) src.bowl)  ~
        :~
          [%pass /boat %agent [src.bowl %boat] %watch /convoy]
          [%pass /boat %agent [src.bowl %boat] %watch /online]
        ==
    ?+  -.sign  ~|([%unexpected-agent-sign wire -.sign] !!)
      %poke-ack  (~(put by receipts) src.bowl ?=(~ p.sign))
    ==
  ==
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?>  =(our src):bowl
  |^  ?+  path  [~ ~]
        [%y ~]                 (arc %requests %radar %convoy ~)
        [%y %requests ~]        (arc ~)
        [%y %charted ~]        (arc (las charted))
        [%y %convoy ~]        (arc (las convoy))
        [%x %online ~]         (jop online)
        [%x %online @ ~]     (asj (bind (slaw %p i.t.t.path) (sin online)))
        [%x %requests ~]        (alp requests)
        [%x %requests @ ~]      (ask (bind (slaw %p i.t.t.path) (sin requests)))
        [%x %charted ~]        (alp charted)
        [%x %charted ~ ~]      [~ ~]
        [%x %charted @ta ~]    (alp (lap charted i.t.t.path))
        [%x %charted @ta @ ~]  (ask (bind (wat t.t.path) (hal charted)))
        [%x %convoy ~]        (alp convoy)
        [%x %convoy ~ ~]      [~ ~]
        [%x %convoy @ta ~]    (alp (lap convoy i.t.t.path))
        [%x %convoy @ta @ ~]  (ask (bind (wat t.t.path) (hal convoy)))
      ::
          [%x %json ~]  ::NOTE  dumb hack, subject to change
        =;  =json  ``json+!>(json)
        =,  enjs:format
        %-  pairs
        :~  :-  'charted'
            %-  pairs
            %+  turn  ~(tap by radar)
            |=  [=^ship lists=(set @ta)]
            :-  (rsh 3 (scot %p ship))
            %-  pairs
            :~  'lists'^a+(turn ~(tap in lists) (lead %s))
                'ack'^(fall (bind (~(get by receipts) ship) (lead %b)) ~)
            ==
          ::
            :-  'requests'
            %-  pairs
            %+  turn  ~(tap in requests)
            |=(=^^ship [(rsh 3 (scot %p ship)) b+&])
        ==
      ==
  ::  scry results
  ++  arc  |=  l=(list @ta)  ``noun+!>(`arch`~^(malt (turn l (late ~))))
  ++  alp  |=  s=(set @p)    ``noun+!>(s)
  ++  jop  |=  s=(set @p)    ``noun+!>(`json`a+(turn ~(tap in s) (corl (lead %s) (cury scot %p))))
  ++  alf  |=  f=?           ``noun+!>(f)
  ++  alj  |=  s=?    ``noun+!>(`json`b+s)
  ++  ask  |=  u=(unit ?)  ?^(u (alf u.u) [~ ~])
  ++  asj  |=  u=(unit ?)  ?^(u (alj u.u) [~ ~])
  ::  data wrestling
  ++  wat  |=([l=@ta p=@ta ~] ?~(p=(slaw %p p) ~ (some [l u.p])))
  ++  nab  ~(got by radar)
  ++  las  |=(s=(set @p) (zing (turn (sit s) |=(=@p (sit (nab p))))))
  ++  lap  |=([s=(set @p) l=@ta] (ski s |=(=@p ((sin (nab p)) l))))
  ++  hal  |=(s=(set @p) |=([l=@ta =@p] ((sin ?~(l s (lap s l))) p)))
  ::  set shorthands
  ++  sin  |*(s=(set) ~(has in s))
  ++  sit  |*(s=(set) ~(tap in s))
  ++  ski  |*([s=(set) f=$-(* ?)] (sy (skim (sit s) f)))
  ::  boat
  ++  requests  sos
  ++  charted  ~(key by radar)
  ++  convoy  (~(int in charted) requests)
  --
::
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  ?+  sign-arvo  (on-arvo:def wire sign-arvo)
      [%eyre %bound *]
    ~?  !accepted.sign-arvo
      [dap.bowl 'eyre bind rejected!' binding.sign-arvo]
    [~ this]
  ==
::
++  on-leave  on-leave:def
::
++  on-fail   on-fail:def
--
::
|_  =bowl:gall
++  requests  sos
++  charted  ~(key by radar)
++  convoy  (~(int in charted) requests)
--
