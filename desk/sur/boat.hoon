::  boat: jacked in status
::
|%
+$  harbor  ::  local state
  $:  online=(set ship)                                 :: online pals
      boating=?                                         :: jacked in?
      radar=(jug ship @ta)                            :: tacking to ships
      sos=(set ship)                               :: tacks received
      receipts=(map ship ?)                             :: receipt of tack
  ==
::
+$  gesture  ::  to/from others
  $%  [%liv ~]                                          :: we sail
      [%ded ~]                                          :: we die
      [%ale ~]                                          :: we drink
      [%nap ~]                                          :: we nap
  ==
::
+$  command  ::  from ourselves
  $%  [%tack =ship in=(set @ta)]                        :: track ship
      [%veer =ship in=(set @ta)]                        :: untrack ship
      [%sail =ship in=(set @ta)]                        :: set online
      [%moor =ship in=(set @ta)]                        :: set offline
  ==
  ::
+$  effect  ::  to ourselves
  $%  convoy-effect
      foreign-effect
  ==
::
+$  convoy-effect
  $%  [%tack =ship]
      [%veer =ship]
      [%sail =ship]
      [%moor =ship]
  ==
::
+$  foreign-effect
  $%  [%chart =ship]                                    :: request from foreign
      [%drift =ship]                                    :: cancel from foreign
  ==
--
