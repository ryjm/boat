::  boat index
::
/-  *boat, contact=contact-store
/+  rudder, sigil-svg=sigil
::
^-  (page:rudder harbor command)
::
=>  |%
    +$  role  ?(%all %tanker %chart %request)
    --
::
|_  [=bowl:gall order:rudder harbor]
++  argue
  |=  [headers=header-list:http body=(unit octs)]
  ^-  $@(brief:rudder command)
  =/  args=(map @t @t)
    ?~(body ~ (frisk:rudder q.u.body))
  ?~  what=(~(get by args) 'what')
    ~
  ?~  who=(slaw %p (~(gut by args) 'who' ''))
    'invalid ship name'
  ?:  =(u.who our.bowl)
    'already a part of the convoy'
  |^  ?+  u.what  'matey what?'
          ?(%tack %veer)
        ?:  ?=(%veer u.what)
          [%veer u.who ~]
        =/  tags  get-lists
        ?~  tags  tag-error
        [%tack u.who u.tags]
      ::
          ?(%enlist %unlist)
        =/  tags  get-lists
        ?~  tags  tag-error
        ?:  =(~ u.tags)  'no-op'
        ?:  ?=(%enlist u.what)
          [%tack u.who u.tags]
        [%veer u.who u.tags]
      ==
  ::
  ++  tag-error
    'tags must be in @ta (lowercase & url-safe) format and comma-separated'
  ::
  ++  get-lists
    ^-  (unit (set @ta))
    %+  rush  (~(gut by args) 'lists' '')
    %+  cook
      |=(s=(list @ta) (~(del in (~(gas in *(set @ta)) s)) ''))
    (more (ifix [. .]:(star ace) com) urs:ab)
  --
::
++  final  (alert:rudder url.request build)
::
++  build
  |=  $:  arg=(list [k=@t v=@t])
          msg=(unit [o=? =@t])
      ==
  ^-  reply:rudder
  ::
  =/  rel=role
    =/  a  (~(gas by *(map @t @t)) arg)
    =/  r  (~(gut by a) 'rel' %all)
    ?:(?=(role r) r %all)
  =/  tag=(set @ta)
    %-  sy
    %+  murn  arg
    |=  [k=@t v=@t]
    ?:(=('tag' k) (some v) ~)
  ::
  =/  tog=@t
    =-  (~(gut by -) 'tog' 'none')
    (~(gas by *(map @t @t)) arg)
  ::
  =/  toggled=@t
    ?:  =('block' tog)
      'none'
    'block'
  ::
  |^  [%page page]
  ::
  ++  icon-color  "black"
  ::
  ++  style
    '''
    /* the props */
    @import "https://unpkg.com/open-props";
    @import "https://unpkg.com/open-props/masks.edges.min.css";

    /* optional imports that use the props */
    @import "https://unpkg.com/open-props/normalize.min.css";
    @import "https://unpkg.com/open-props/buttons.min.css";
    @import "https://unpkg.com/open-props/open-props.shadow.min.css";
    @import "https://unpkg.com/open-props/normalize.dark.min.css";
    @import "https://unpkg.com/open-props/buttons.dark.min.css";
    @import "https://unpkg.com/open-props/normalize.light.min.css";
    @import "https://unpkg.com/open-props/buttons.light.min.css";
    @import "https://unpkg.com/open-props/indigo.shadow.min.css";
    @import "https://unpkg.com/open-props/easings.shadow.min.css";
    @import "https://unpkg.com/open-props/animations.shadow.min.css";
    @import "https://unpkg.com/open-props/sizes.shadow.min.css";
    @import "https://unpkg.com/open-props/gradients.shadow.min.css";
    /*
    @import "https://unpkg.com/open-props/indigo.min.css";
    @import "https://unpkg.com/open-props/indigo-hsl.min.css";
    @import "https://unpkg.com/open-props/easings.min.css";
    @import "https://unpkg.com/open-props/animations.min.css";
    @import "https://unpkg.com/open-props/sizes.min.css";
    @import "https://unpkg.com/open-props/gradients.min.css";
    */
    /* see PropPacks for the full list */
      @import "open-props/colors-hsl";


      .backdrop {
        background-color: hsl(var(--gray-9-hsl) / 30%);
      }
    html {
      --text-1: var(--gray-9);
      --text-2: var(--gray-7);

      @media (--OSdark) {
        --text-1: var(--gray-1);
        --text-2: var(--gray-2);
      }
    }
    * {
        line-height: var(--font-lineheight-1);
        font-size: var(--font-size-fluid-0);
        font-weight: var(--font-weight-9);
        margin: 0.2em;
        padding: 0.2em;
        font-family: var(--font-mono);
         }
    h2 {
        font-size: var(--font-size-fluid-1);
          }
    p { max-width: 50em; }

    form { margin: 0; padding: 0; }

    .red { font-weight: bold; color: var(--red-8); }
    .green {
      min-inline-size: var(--size-fluid-6);
      background: var(--gradient-9);
      max-width: fit-content;
      animation: var(--animation-ping) forwards;
      animation-duration: 1s;
      animation-iteration-count: 4;
      border-radius: var(--radius-2);
      text-shadow: 0 1px 0 rgb(0 0 0 / 67%);
      color: var(--green-4);
      text-align: center;
     }

    a {
      display: inline-block;
      color: inherit;
    }

    .boat-box {
      box-shadow: var(--shadow-3);
      max-width: fit-content;
      background-color: var(--stone-1);
      border-radius: var(--radius-2);
      padding: 0.1em;
      font-style: italic;
      white-space: pre-line;
    }

    .phew {
      background: var(--gradient-9);
      min-inline-size: var(--size-fluid-6);
      text-shadow: 0 0.4px 0 rgb(0 0 0 / 67%);
      max-width: 50em;
      text-align: center;
      padding: 20;
      -webkit-mask: var(--mask-edge-scalloped);
    }
    .class-filter a {
      box-shadow: var(--shadow-2);
      background-color: var(--stone-3);
      border-radius: var(--radius-1);
      border: var(--border-size-3);
      padding: 0.1em;
    }

    .class-filter.all .all,
    .class-filter.mutual .mutual,
    .class-filter.target .target,
    .class-filter.leeche .leeche {
      border: var(--border-size-1) solid var(--choco-7)
    }

    .label-filter a {
        background-color: var(--stone-3);
        border-radius: var(--radius-1);
        border: var(--border-size-1) solid var(--gray-4);
        padding: 0.1em;
    }

    .label-filter a.yes {
      border: var(--border-size-1) solid var(--blue-3)
    }

    .class-filter .all::before,
    .class-filter .mutual::before,
    .class-filter .target::before,
    .class-filter .leeche::before,
    .label-filter a::before {
      content: ' ☐ '
    }

    .class-filter.all .all::before,
    .class-filter.mutual .mutual::before,
    .class-filter.target .target::before,
    .class-filter.leeche .leeche::before,
    .label-filter a.yes::before {
      content: ' ☒ '
    }

    table#boat tr td:nth-child(2) {
      padding: 0 0.5em;
    }

    .sigil {
      display: inline-block;
      vertical-align: middle;
      margin: 0 0.5em 0 0;
      padding: 0.2em;
      border-radius: 0.2em;
    }

    .sigil * {
      margin: 0;
      padding: 0;
    }

    .label {
      display: inline-block;
      border-radius: var(--radius-2);
      margin-right: 0.5em;
      padding: 0.1em;
    }
    .label input[type="text"] {
      max-width: 100px;
    }
    .label span {
      margin: 0 0 0 0.2em;
    }
    button {
      color: var(--sand-6);
      background-color: var(--sand-0);
      border: 1px solid var(--sand-1);
      text-shadow: 0 1px 0 var(--sand-2);
      padding: 0.3em 0.75em; /* increased by 50% */

      &:hover {
        background-color: var(--sand-1);
      }
    }
    '''
  ::
  ++  page
    ^-  manx
    ;html
      ;head
        ;title:"%boat"
        ;meta(charset "utf-8");
        ;meta(name "viewport", content "width=device-width, initial-scale=1");
        ;style:"{(trip style)}"
      ==
      ;body
        ;h2:"boat.land"

        ;p.boat-box(onclick "document.getElementById('poem').style.display='block'")
          ;+  =/  url  =;  param   `tape`['/' 'b' 'o' 'a' 't' param]
            `tape`['?' 't' 'o' 'g' '=' (trip toggled)]
          ;a.toggled/"{url}":"O"
          ;t:"Amidst the tumultuous waves, we sailed with might..."
        ==
        ;+  ;p.boat-box
          =id  "poem"
          =onclick  "this.style.display='none'"
          =style  "display: {(trip tog)}"
          ;+  ;/  %-  trip
          '''
            As merchant captains in the Battle of the Atlantic's fight.
            Our ships laden with goods, a vital link in the war's chain,
            But beneath the surface, lurked an enemy in disdain.

            But lurking beneath, were U-Boats to fear,
            Their torpedoes seeking our hulls to shear.
            We zigzagged through the seas, our nerves taut,
            Praying for safety, every moment fraught.

            The sound of engines, the splash of waves,
            A steady hand on the wheel, our lives to save.
            In the face of danger, we stood tall,
            And fought for our mission, despite it all.

            The merchant captain, a brave soul at sea,
            Whose courage and grit, forever will be.
            In history's annals, our deeds written true,
            As heroes of the Atlantic, both me and my crew.
          '''
        ==
        Extension of pals that that lets you see a ship\'s online status.

        The status icons below indicate whether the ship is a tanker,
        requested a chart, or one you have requested a chart of.

        tanker - part of your convoy, can see your online status.

        chart - you have requested a chart of this ship. neither of you can see
        the other\'s online status.

        request - this ship has requested a chart of you. neither of you can see
        the other\'s online status.


        ;+  ?~  msg  ;p:""
            ?:  o.u.msg  ::TODO  lightly refactor
              ;p.green:"{(trip t.u.msg)}"
            ;p.red:"{(trip t.u.msg)}"

        ;+  class-selectors
        ;+  label-selectors

        ;table#boat
          ;form(method "post")
            ;tr(style "font-weight: bold")
              ;td:""
              ;td:""
              ;td:"@p"
              ;td:"tags"
            ==
            ;tr
              ;td:""
              ;td
                ;button(type "submit", name "what", value "tack"):"+"
              ==
              ;td
                ;input(type "text", name "who", placeholder "~dorfer-ladryd");
              ==
              ;td.label
                ;input(type "text", name "lists", placeholder "lusitania, hx-90, sc-7");
              ==
            ==
          ==
          ;*  ?:(|(=(%all rel) =(%tanker rel)) (escort %tanker convoy) ~)
          ;*  ?:(|(=(%all rel) =(%chart rel)) (escort %chart charted) ~)
          ;*  ?:(|(=(%all rel) =(%request rel)) (escort %request requests) ~)
        ==
      ==
    ==
  ::
  ++  slur
    |=  [rel=role tag=(set @ta)]
    ^-  tape
    =-  ['/' 'b' 'o' 'a' 't' -]
    |^  ^-  tape
        ?-  [rel tag]
          [%all ~]  ""
          [* ~]     ['?' 'r' 'e' 'l' '=' (trip rel)]
          [%all *]  ['?' 't' 'a' 'g' '=' tags]
          [* *]     (weld $(tag ~) '&' 't' 'a' 'g' '=' tags)
        ==
    ++  tags  =>  [tag=tag ..zuse]  ~+
              (zing (join "&tag=" (turn ~(tap in tag) trip)))
    --
  ::
  ++  class-selectors
    ^-  manx
    =/  m  (lent convoy)
    =/  t  (lent charted)
    =/  l  (lent requests)
    ;div(class "class-filter {(trip rel)}")
      ; filter:
      ;a.all/"{(slur %all tag)}":"all ({(scow %ud :(add m t l))})"
      ;a.tanker/"{(slur %tanker tag)}":"convoy ({(scow %ud m)})"
      ;a.chart/"{(slur %chart tag)}":"chart ({(scow %ud t)})"
      ;a.request/"{(slur %request tag)}":"requests ({(scow %ud l)})"
    ==
  ::
  ++  label-selectors
    ^-  manx
    ;div.label-filter  ; labels:
      ;*
      %+  turn
        =-  (sort - aor)
        %~  tap   by
        %+  roll  ~(val by radar)
        |=  [l=(set @ta) a=(map @ta @ud)]
        =/  l=(list @ta)  ~(tap in l)
        |-
        ?~  l  a
        $(l t.l, a (~(put by a) i.l +((~(gut by a) i.l 0))))
      |=  [l=@ta n=@ud]
      =/  hav  (~(has in tag) l)
      =.  tag  (?:(hav ~(del in tag) ~(put in tag)) l)
      =/  l  (trip l)
      ?.  hav
        ;a/"{(slur rel tag)}":"{l} ({(scow %ud n)})"
      ;a.yes/"{(slur rel tag)}":"{l} ({(scow %ud n)})"
    ==
  ::
  ++  list-label
    |=  =ship
    |=  name=@ta
    ^-  manx
    ;form.label(method "post")
      ;span:"{(trip name)}"
      ;input(type "hidden", name "who", value "{(scow %p ship)}");
      ;input(type "hidden", name "lists", value "{(trip name)}");
      ;button(type "submit", name "what", value "unlist"):"x"
    ==
  ::
  ++  list-adder
    |=  =ship
    ^-  manx
    ;form.label(method "post")
      ;input(type "text", name "lists", placeholder "sc-7, hx-90");
      ;input(type "hidden", name "who", value "{(scow %p ship)}");
      ;input(type "hidden", name "what", value "enlist");
    ==
  ::
  ++  rescue
    |=  =ship
    ^-  manx
    ;form(method "post")
      ;input(type "hidden", name "who", value "{(scow %p ship)}");
      ;button(type "submit", name "what", value "tack"):"+"
    ==
  ::
  ++  torpedo
    |=  =ship
    ^-  manx
    ;form(method "post")
      ;input(type "hidden", name "who", value "{(scow %p ship)}");
      ;button(type "submit", name "what", value "veer"):"-"
    ==
  ::
  ++  escort
    ::TODO  maybe take acks in pez and do sorting internally?
    |=  [kind=?(%request %tanker %chart) pez=(list [ship (set @ta)])]
    ^-  (list manx)
    %+  turn  pez
    |=  [=ship lists=(set @ta)]
    ^-  manx
    =/  ack=(unit ?)  (~(get by receipts) ship)
    ;tr
      ;td
        ;+  (status kind ack)
      ==
      ;+  ?:  ?=(%request kind)
            ;td
              ;+  (rescue ship)
            ==
          ;td
            ;+  (torpedo ship)
          ==
      ;td
        ;+  (sigil ship)
        ; {(scow %p ship)}
      ==
      ;+  ?:  ?=(%request kind)  ;td;
          ;td
            ;+  (list-adder ship)
            ;*  (turn (sort ~(tap in lists) aor) (list-label ship))
          ==
    ==
  ::
  ++  convoy  ~+
    %+  skim  (sort ~(tap by radar) dor)
    |=  [=ship les=(set @ta)]
    ?&  (~(has in sos) ship)
    ?|  =(~ tag)
        (~(any in les) ~(has in tag))
    ==  ==
  ::
  ++  charted  ~+
    %+  sort
      %+  skim  ~(tap by radar)
      |=  [=ship les=(set @ta)]
      ?&  !(~(has in sos) ship)
      ?|  =(~ tag)
          (~(any in les) ~(has in tag))
      ==  ==
    |=  [[sa=ship ma=*] [sb=ship mb=*]]
    =+  a=(~(get by receipts) sa)
    =+  b=(~(get by receipts) sb)
    ?:  =(a b)  (dor ma mb)
    ?~(a ?=(~ b) ?~(b & |(u.a !u.b)))
  ::
  ++  requests  ~+
    ?.  =(~ tag)  ~
    %+  murn  (sort ~(tap in sos) dor)
    |=  =ship
    ?:  (~(has by radar) ship)  ~
    (some ship ~)
  ::
  ++  contacts  ~+
    =/  base=path
      /(scot %p our.bowl)/contact-store/(scot %da now.bowl)
    ?.  .^(? %gu base)  *rolodex:contact
    .^(rolodex:contact %gx (weld base /all/noun))
  ::
  ++  sigil
    |=  =ship
    ^-  manx
    =/  bg=@ux
      ?~(p=(~(get by contacts) ship) 0xff.ffff color.u.p)
    =/  fg=tape
      ::TODO  move into sigil.hoon or elsewhere?
      =+  avg=(div (roll (rip 3 bg) add) 3)
      ?:((gth avg 0xc1) "black" "white")
    =/  bg=tape
      ((x-co:co 6) bg)
    ;div.sigil(style "background-color: #{bg}; width: 20px; height: 20px;")
      ;img@"/boat/sigil.svg?p={(scow %p ship)}&fg={fg}&bg=%23{bg}&icon&size=20";
    ==
  ++  status
    |=  [kind=?(%request %tanker %chart) ack=(unit ?)]
    =.  ack
      ?.  ?=(%chart kind)  ~
      `(fall ack |)
    ^-  manx  ~+
    ?-  kind
        %request
      ;div
        ;+  %-  need  %-  de-xml:html
        '''
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="30" height="100" fill="#00247D"/>
          <rect x="30" y="0" width="70" height="100" fill="#F9A602"/>
        </svg>
        '''
        ==
    ::
        %tanker
      ;div
        ;+  %-  need  %-  de-xml:html
        '''
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path fill="#CCCCCC" d="M40.7,45.2c-2.6-1.5-5.5-2.5-8.5-2.5H13.9c-3.9,0-7.1-3.2-7.1-7.1v0c0-3.9,3.2-7.1,7.1-7.1h18.3V45.2z"/>
          <path fill="#FFCC00" d="M31.3,63.3c0,0,0.5-5.2,2.5-5.2h14.5c2.5,0,2.5,5.2,2.5,5.2v17.5c0,2.9-2.4,5.2-5.2,5.2H36.5c-2.9,0-5.2-2.4-5.2-5.2V63.3z"/>
          <path fill="#FFFFFF" d="M26.4,41.4h35c1.7,0,3-1.3,3-3v-6.8c0-1.7-1.3-3-3-3h-35c-1.7,0-3,1.3-3,3v6.8C23.4,40.1,24.7,41.4,26.4,41.4z"/>
          <path fill="#CCCCCC" d="M64.1,34.1h-30c-1.7,0-3,1.3-3,3v9.8c0,1.7,1.3,3,3,3h30c1.7,0,3-1.3,3-3v-9.8C67.1,35.4,65.8,34.1,64.1,34.1z"/>
          <path fill="#CCCCCC" d="M52.5,29.2H43.6c-1.7,0-3,1.3-3,3v20.7c0,1.7,1.3,3,3,3h8.9c1.7,0,3-1.3,3-3V32.2C55.4,30.4,54.1,29.2,52.5,29.2z"/>
          <path fill="#CCCCCC" d="M72.4,22.7H27.6c-4.8,0-8.7,3.9-8.7,8.7v34.6c0,4.8,3.9,8.7,8.7,8.7h44.8c4.8,0,8.7-3.9,8.7-8.7V31.5C81.1,26.6,77.2,22.7,72.4,22.7z M76.1,66.1c0,3-2.5,5.5-5.5,5.5H29.4c-3,0-5.5-2.5-5.5-5.5V31.2c0-3,2.5-5.5,5.5-5.5h41.2c3,0,5.5,2.5,5.5,5.5V66.1z"/>
        </svg>
        '''
      ==
    ::
        %chart
      ;div
        ;+  ?.  =([~ &] ack)
            %-  need  %-  de-xml:html
      '''
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="30" fill="#FF0000"/>
          <path d="M50 10L70.7 70.7L10 50L50 10Z" fill="#FFFFFF"/>
      </svg>
      '''
        %-  need  %-  de-xml:html
        '''
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="30" fill="#FF0000"/>
              <path d="M50 10L70.7 70.7L10 50L50 10Z" fill="#FFFFFF"/>
        </svg>
        '''
      ==
    ==
 --
--
