## Blackout End

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P1["&bull; The power is back, but it's hard to tell how long it will last.<br/>&bull; The anomaly has disappeared for now."]
P1 --> P2
P1 --> P4
P1 --> P5
P2["[hasAirLimit]"]
P2 --> P3
P3["I suggest you build additional Support Stations to keep the cavern breathable."]
P3 --> P5
P4["The Canteen doesn't need power, so you might want to build one as a backup."]
P4 --> P5
P5["[end]"]
```

## Blackout Start

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P0 --> P2
P1["&bull; Hmmm -<br/>&bull; Oh no!<br/>&bull; This isn't good."]
P1 --> P2
P2["&bull; the magnetic shifts are interfering with our Power Station.<br/>&bull; the anomaly disabled our Power Station.<br/>&bull; our Energy Crystals aren't able to power our HQ right now."]
P2 --> P3
P3["[end]"]
```

## Boss Enemy Defeated

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P1["&bull; Good work!<br/>&bull; Your Rock Raiders made short work of that Rock Monster.<br/>&bull; That's a relief!<br/>&bull; I was worried for a minute there."]
P1 --> P2
P2["[end]"]
```

## Base Destroyed - Mission Failure

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P1["&bull; With your base destroyed,<br/>&bull; Oh no! The Rock Raider HQ is in ruins, and"]
P1 --> P2
P2["&bull; I don't think you can complete our mission.<br/>&bull; that doesn't bode well for our mission."]
P2 --> P3
P3["&bull; I'm pulling you out.<br/>&bull; We're teleporting everyone out.<br/>&bull; I'm ordering you to evacuate immedately!"]
P3 --> P4
P4["[end]"]
```

## Found All Lost Miners

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P0 --> P3
P0 --> P5
P1["[lostMinersOne]"]
P1 --> P2
P2["&bull; Look! It's the lost Rock Raider!<br/>&bull; You found the missing Rock Raider!"]
P2 --> P6
P2 --> P8
P3["[lostMinersTogether]"]
P3 --> P4
P4["&bull; the three Rock Raiders are right here, safe and sound!<br/>&bull; You found all three Rock Raiders!<br/>&bull; That's all of the missing Rock Raiders found!"]
P4 --> P6
P4 --> P8
P5["&bull; And that makes three Rock Raiders found!<br/>&bull; You found all three Rock Raiders!<br/>&bull; That's all all three Rock Raiders found!"]
P5 --> P6
P5 --> P8
P6["[resourceObjective]"]
P6 --> P7
P7["Now, collect {resource goal}."]
P7 --> P8
P8["[end]"]
```

## Found Crystal Hoard

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P1["&bull; Wow! This ought to do it!<br/>&bull; You've found quite the haul here.<br/>&bull; Our intel was accurate. Look at all those Energy Crystals!"]
P1 --> P2
P1 --> P3
P1 --> P5
P2["&bull; Now, transport these Energy Crystals back to your base.<br/>&bull; Bring this to your base to complete our mission!<br/>&bull; Get this back to your base."]
P2 --> P7
P2 --> P8
P2 --> P9
P2 --> P10
P3["[treasureCaveMany]"]
P3 --> P4
P4["&bull; With this, we have enough to complete our mission!<br/>&bull; Collect all the Energy Crystals you've found and complete our mission!"]
P4 --> P7
P4 --> P8
P4 --> P9
P4 --> P10
P5["[hasMonsters]"]
P5 --> P6
P6["&bull; I hope we can collect these without attracting too much attention.<br/>&bull; Be careful, Cadet! This is surely enough to attract those {enemies}."]
P6 --> P7
P6 --> P8
P6 --> P9
P6 --> P10
P7["[treasureCaveOne]"]
P7 --> P9
P7 --> P10
P8["[treasureCaveMany]"]
P8 --> P9
P8 --> P10
P9["[hasMonsters]"]
P9 --> P10
P10["[end]"]
```

## Found HQ

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P0 --> P2
P0 --> P3
P1["&bull; Our Rock Raider HQ is safe and sound!<br/>&bull; Way to go, Cadet!"]
P1 --> P4
P2["[reachHq]"]
P2 --> P4
P2 --> P5
P3["&bull; You found the Rock Raider HQ.<br/>&bull; There it is!"]
P3 --> P4
P3 --> P5
P4["&bull; Now, <br/>&bull; Now you should be able to"]
P4 --> P12
P4 --> P14
P4 --> P16
P4 --> P18
P4 --> P21
P4 --> P24
P4 --> P25
P4 --> P28
P5["[hasMonsters]"]
P5 --> P6
P6["&bull; Shore up the base defenses<br/>&bull; Now, get some Electric Fences up"]
P6 --> P7
P6 --> P11
P7["&bull; before the monsters find it too!<br/>&bull; and keep it safe from those {enemies}!<br/>&bull; and hope those monsters don't cause any more damage!"]
P7 --> P8
P7 --> P9
P7 --> P10
P7 --> P27
P7 --> P30
P8["[lostMinersOne]"]
P8 --> P27
P8 --> P30
P9["[lostMinersTogether]"]
P9 --> P27
P9 --> P30
P10["[lostMinersApart]"]
P10 --> P27
P10 --> P30
P11["&bull; . We need this base secure if we're going to<br/>&bull; . Once the base is safe,"]
P11 --> P12
P11 --> P14
P11 --> P16
P11 --> P18
P11 --> P21
P11 --> P24
P11 --> P25
P11 --> P28
P12["[buildAndPowerGcOne]"]
P12 --> P13
P13["build that Geological Center"]
P13 --> P20
P13 --> P23
P14["[buildAndPowerGcMultiple]"]
P14 --> P15
P15["build the Geological Centers"]
P15 --> P20
P15 --> P23
P16["[buildAndPowerSsOne]"]
P16 --> P17
P17["build that Support Station"]
P17 --> P20
P17 --> P23
P18["[buildAndPowerSsMultiple]"]
P18 --> P19
P19["build the Support Station"]
P19 --> P20
P19 --> P23
P20["and"]
P20 --> P21
P20 --> P24
P20 --> P25
P20 --> P28
P21["[lostMinersOne]"]
P21 --> P22
P22["find the lost Rock Raider!"]
P22 --> P27
P22 --> P30
P23["!"]
P23 --> P27
P23 --> P30
P24["[lostMinersTogether]"]
P24 --> P26
P25["[lostMinersApart]"]
P25 --> P26
P26["find those lost Rock Raiders!"]
P26 --> P27
P26 --> P30
P27["[resourceObjective]"]
P27 --> P30
P28["[resourceObjective]"]
P28 --> P29
P29["&bull; collect {resource goal}.<br/>&bull; get those {resource goal names}."]
P29 --> P30
P30["[end]"]
```

## Found Vehicle left by Lost Miners

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P1["&bull; Look! A Hover Scout!<br/>&bull; You found a missing Hover Scout!<br/>&bull; Hmm. That doesn't belong there."]
P1 --> P2
P2["&bull; They must be nearby.<br/>&bull; They must have passed this way.<br/>&bull; They should be close.<br/>&bull; You must be getting warmer."]
P2 --> P3
P3["[end]"]
```

## Found Lost Miners

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P0 --> P3
P1["[foundMinersOne]"]
P1 --> P2
P2["&bull; Look! It's one of the lost Rock Radiers!<br/>&bull; You found a lost Rock Raider!<br/>&bull; You found one of the lost Rock Raiders!"]
P2 --> P5
P2 --> P6
P3["[foundMinersTogether]"]
P3 --> P4
P4["&bull; Look at that! three of the lost Rock Raiders are here, safely together.<br/>&bull; That's three Rock Raiders found!<br/>&bull; You found three of them here!"]
P4 --> P5
P4 --> P6
P5["&bull; Keep going!<br/>&bull; Keep searching, Cadet."]
P5 --> P6
P6["We need to find all three before we can leave."]
P6 --> P7
P7["[end]"]
```

## Found Slimy Slug Nest

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P1["&bull; I don't like the look of this.<br/>&bull; Look at that!<br/>&bull; Oh, dear.<br/>&bull; This could be a problem!"]
P1 --> P2
P2["&bull; It must be a nest of Slimy Slugs!<br/>&bull; We need to keep these Slimy Slugs at bay."]
P2 --> P3
P3["[end]"]
```

## Gas Leak - Support Stations Insufficient

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P0 --> P2
P1["&bull; Careful there!<br/>&bull; Oh no!<br/>&bull; This isn't good."]
P1 --> P2
P2["Our Support Stations can't keep up and this cavern will be uninhabitable very quickly."]
P2 --> P3
P3["Fix it NOW or we will need to abort!"]
P3 --> P4
P4["[end]"]
```

## Gas Leak - All Support Stations offline

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P0 --> P2
P1["&bull; Careful there!<br/>&bull; Oh no!<br/>&bull; This isn't good."]
P1 --> P2
P2["Without even one Support Station online, this cavern will be uninhabitable very quickly."]
P2 --> P3
P3["Fix it NOW or we will need to abort!"]
P3 --> P4
P4["[end]"]
```

## Mob Farm no longer blocking

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P1["With so many Energy Crystals removed, you should now have no issues teleporting in the other vehicles."]
P1 --> P2
P1 --> P4
P1 --> P5
P1 --> P7
P2["[lostMinersOne]"]
P2 --> P3
P3["Use them to find that missing Rock Raider!"]
P3 --> P7
P4["[lostMinersTogether]"]
P4 --> P6
P5["[lostMinersApart]"]
P5 --> P6
P6["Use them to find those missing Rock Raiders!"]
P6 --> P7
P7["[end]"]
```

## Nomads have settled

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P0 --> P12
P0 --> P24
P0 --> P29
P0 --> P30
P1["&bull; This seems like as good a place as any.<br/>&bull; Well done, Cadet."]
P1 --> P2
P1 --> P5
P1 --> P6
P1 --> P9
P2["[lostMinersOne]"]
P2 --> P3
P2 --> P4
P3["[resourceObjective]"]
P3 --> P4
P4["Now, go find that lost Rock Raider!"]
P4 --> P11
P4 --> P37
P5["[lostMinersTogether]"]
P5 --> P7
P5 --> P8
P6["[lostMinersApart]"]
P6 --> P7
P6 --> P8
P7["[resourceObjective]"]
P7 --> P8
P8["Now, go find those lost Rock Raiders!"]
P8 --> P11
P8 --> P37
P9["[resourceObjective]"]
P9 --> P10
P10["&bull; Now, collect {resource goal}.<br/>&bull; Those {resource goal names} are as good as ours!"]
P10 --> P11
P10 --> P37
P11["[hasMonsters]"]
P11 --> P37
P12["With your base constructed, you should now have no problem"]
P12 --> P13
P12 --> P16
P12 --> P17
P12 --> P20
P13["[lostMinersOne]"]
P13 --> P14
P13 --> P15
P14["[resourceObjective]"]
P14 --> P15
P15["finding that lost Rock Raider!"]
P15 --> P22
P15 --> P37
P16["[lostMinersTogether]"]
P16 --> P18
P16 --> P19
P17["[lostMinersApart]"]
P17 --> P18
P17 --> P19
P18["[resourceObjective]"]
P18 --> P19
P19["finding those lost Rock Raiders!"]
P19 --> P22
P19 --> P37
P20["[resourceObjective]"]
P20 --> P21
P21["collecting {resource goal}!"]
P21 --> P22
P21 --> P37
P22["[hasMonsters]"]
P22 --> P23
P22 --> P37
P23["&bull; Don't forget to build plenty of Electric Fences in case those {enemies} come.<br/>&bull; Just keep an eye out for those {enemies}."]
P23 --> P37
P24["With your Support Station built, you can move on to building"]
P24 --> P25
P24 --> P27
P25["[buildAndPowerGcOne]"]
P25 --> P26
P26["that Geological Center! Be sure to place it in the cavern marked with an arrow."]
P26 --> P32
P26 --> P33
P26 --> P34
P26 --> P35
P26 --> P36
P26 --> P37
P27["[buildAndPowerGcMultiple]"]
P27 --> P28
P28["those Geological Centers!"]
P28 --> P32
P28 --> P33
P28 --> P34
P28 --> P35
P28 --> P36
P28 --> P37
P29["[buildAndPowerSsOne]"]
P29 --> P31
P30["[buildAndPowerSsMultiple]"]
P30 --> P31
P31["FAIL!!"]
P31 --> P32
P31 --> P33
P31 --> P34
P31 --> P35
P31 --> P36
P31 --> P37
P32["[resourceObjective]"]
P32 --> P33
P32 --> P34
P32 --> P35
P32 --> P36
P32 --> P37
P33["[lostMinersOne]"]
P33 --> P36
P33 --> P37
P34["[lostMinersTogether]"]
P34 --> P36
P34 --> P37
P35["[lostMinersApart]"]
P35 --> P36
P35 --> P37
P36["[hasMonsters]"]
P36 --> P37
P37["[end]"]
```
