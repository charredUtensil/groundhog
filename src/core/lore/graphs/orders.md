## Briefing - Premise

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P0 --> P2
P0 --> P4
P0 --> P6
P0 --> P8
P0 --> P9
P0 --> P52
P0 --> P209
P0 --> P225
P1["Our mining operations have been going smoothly, and we are ready to move on to the next cavern.<br/>There is nothing out of the ordinary to report today.<br/>Things have been quiet and I hope they should remain that way, Cadet!"]
P1 --> P234
P2["[floodedWithWater]"]
P2 --> P3
P3["Are you ready to set sail?<br/>I hope you packed your lifejacket, Cadet."]
P3 --> P7
P4["[floodedWithLava]"]
P4 --> P5
P5["I hope you're not afraid of a little heat!<br/>You'd better keep your cool with this one!"]
P5 --> P7
P6["Are you ready for the next mission?<br/>Welcome back, Cadet.<br/>I hope you're prepared for this one, Cadet.<br/>Up and at 'em, Cadet!<br/>Cadet, are you up for some more action?"]
P6 --> P7
P7["\\n\n"]
P7 --> P8
P7 --> P9
P8 --> P10
P8 --> P21
P8 --> P22
P8 --> P30
P8 --> P32
P8 --> P41
P8 --> P54
P8 --> P55
P8 --> P56
P8 --> P57
P8 --> P59
P8 --> P61
P8 --> P63
P8 --> P65
P8 --> P67
P8 --> P69
P8 --> P90
P8 --> P91
P8 --> P170
P8 --> P189
P9["[hasGiantCave]"]
P9 --> P10
P9 --> P21
P9 --> P22
P9 --> P30
P9 --> P32
P9 --> P41
P9 --> P54
P9 --> P55
P9 --> P56
P9 --> P57
P9 --> P59
P9 --> P61
P9 --> P63
P9 --> P65
P9 --> P67
P9 --> P69
P9 --> P90
P9 --> P91
P9 --> P170
P9 --> P189
P10["[findHq]"]
P10 --> P11
P10 --> P12
P10 --> P13
P10 --> P14
P10 --> P15
P10 --> P16
P10 --> P17
P10 --> P18
P10 --> P158
P10 --> P160
P11["[spawnHasErosion]"]
P11 --> P12
P11 --> P13
P11 --> P14
P11 --> P15
P11 --> P16
P11 --> P17
P11 --> P18
P11 --> P158
P11 --> P160
P12["[treasureCaveOne]"]
P12 --> P14
P12 --> P15
P12 --> P16
P12 --> P17
P12 --> P18
P12 --> P158
P12 --> P160
P13["[treasureCaveMany]"]
P13 --> P14
P13 --> P15
P13 --> P16
P13 --> P17
P13 --> P18
P13 --> P158
P13 --> P160
P14["[nomadsOne]"]
P14 --> P16
P14 --> P17
P14 --> P18
P14 --> P158
P14 --> P160
P15["[nomadsMany]"]
P15 --> P16
P15 --> P17
P15 --> P18
P15 --> P158
P15 --> P160
P16["[buildAndPowerGcOne]"]
P16 --> P18
P16 --> P158
P16 --> P160
P17["[buildAndPowerGcMultiple]"]
P17 --> P18
P17 --> P158
P17 --> P160
P18["[hasMonsters]"]
P18 --> P19
P18 --> P20
P19["[hasSlugs]"]
P19 --> P20
P20["We were all set to mine this cavern, but the team was scared off by readings of {enemies} in the area. They left in such a hurry that they forgot to record where exactly the Rock Raider HQ is.<br/>There should be a base near here, but it's not showing up on our scanners. We hope it hasn't been destroyed by {enemies}, but to be safe, we're sending you to a nearby cavern instead."]
P20 --> P234
P21["[buildAndPowerGcOne]"]
P21 --> P23
P21 --> P24
P21 --> P25
P21 --> P26
P21 --> P28
P22["[buildAndPowerGcMultiple]"]
P22 --> P23
P22 --> P24
P22 --> P25
P22 --> P26
P22 --> P28
P23["[treasureCaveOne]"]
P23 --> P25
P23 --> P26
P23 --> P28
P24["[treasureCaveMany]"]
P24 --> P25
P24 --> P26
P24 --> P28
P25["We're sending you to a cavern deep within the planet."]
P25 --> P26
P25 --> P28
P26["Our long-range scanners<br/>The scanners up on the L.M.S. Explorer"]
P26 --> P27
P27["are unable to penetrate the geology in this area and we need some way to amplify them. That's where you come in - we need a team to scan the area manually<br/>have been unreliable at this depth and we'd like to understand the area better"]
P27 --> P45
P27 --> P46
P27 --> P122
P27 --> P161
P27 --> P163
P28["[anchorIsBlackout]"]
P28 --> P29
P29["There seems to be some geomagnetic anomaly in this area and researching it could prove vital to our mining operations"]
P29 --> P45
P29 --> P46
P29 --> P122
P29 --> P161
P29 --> P163
P30["A recent scan<br/>Our most recent geological survey"]
P30 --> P31
P31["found<br/>has discovered<br/>has indicated"]
P31 --> P34
P31 --> P36
P31 --> P38
P31 --> P40
P32["We<br/>The scanners<br/>The scanners aboard the L.M.S. Explorer"]
P32 --> P33
P33["have found<br/>have located<br/>have discovered"]
P33 --> P34
P33 --> P36
P33 --> P38
P33 --> P40
P34["[treasureCaveOne]"]
P34 --> P35
P35["a large Energy Crystal signature near here<br/>a nearby cave with an abundance of Energy Crystals"]
P35 --> P45
P35 --> P46
P35 --> P122
P35 --> P161
P35 --> P163
P36["[treasureCaveMany]"]
P36 --> P37
P37["large deposits of Energy Crystals in this cavern<br/>a cave system with an abundance of Energy Crystals"]
P37 --> P45
P37 --> P46
P37 --> P122
P37 --> P161
P37 --> P163
P38["[hasGiantCave]"]
P38 --> P39
P39["a nearby cavern approximately the size of \"yes\""]
P39 --> P45
P39 --> P46
P39 --> P122
P39 --> P161
P39 --> P163
P40["another cavern where we can continue our mining operations"]
P40 --> P45
P40 --> P46
P40 --> P122
P40 --> P161
P40 --> P163
P41["[anchorIsBlackout]"]
P41 --> P42
P42["We found a cavern with unusual geomagnetic properties. We believe it will have plenty of Energy Crystals<br/>We're sending you to a cavern deep within the planet where we've been picking up unusual magnetic readings"]
P42 --> P43
P42 --> P44
P42 --> P45
P42 --> P46
P42 --> P122
P42 --> P161
P42 --> P163
P43["[treasureCaveOne]"]
P43 --> P45
P43 --> P46
P43 --> P122
P43 --> P161
P43 --> P163
P44["[treasureCaveMany]"]
P44 --> P45
P44 --> P46
P44 --> P122
P44 --> P161
P44 --> P163
P45["."]
P45 --> P234
P46[". \\n\nHowever,<br/>. \\n\nUnfortunately,<br/>. \\n\nUnfortunately for us,<br/>. \\n\nThe bad news?<br/>. Use caution!<br/>, but proceed with caution!\\n\n<br/>, but this is no walk in the park."]
P46 --> P47
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P135
P46 --> P139
P46 --> P139
P46 --> P139
P46 --> P139
P46 --> P139
P46 --> P139
P46 --> P139
P46 --> P139
P46 --> P139
P46 --> P139
P46 --> P139
P46 --> P139
P46 --> P139
P46 --> P139
P46 --> P139
P46 --> P139
P46 --> P142
P46 --> P142
P46 --> P142
P46 --> P142
P46 --> P142
P46 --> P142
P46 --> P142
P46 --> P142
P46 --> P145
P46 --> P145
P46 --> P145
P46 --> P145
P46 --> P147
P46 --> P147
P46 --> P147
P46 --> P147
P46 --> P150
P46 --> P150
P46 --> P154
P47["[findHq]"]
P47 --> P48
P48["we already sent another team down here before, and they failed miserably. You should be able to find their Rock Raider HQ nearby<br/>you aren't the first to attempt this mission. You'll find an existing base somewhere in the viscinity"]
P48 --> P49
P48 --> P51
P49["[hqIsRuin]"]
P49 --> P50
P50[" - or what's left of it at least."]
P50 --> P121
P51["."]
P51 --> P121
P52["Things have been going smoothly... until now!<br/>Bad news, Cadet!<br/>We need your help, Cadet.<br/>Oh, dear."]
P52 --> P53
P53["\\n\n"]
P53 --> P54
P53 --> P55
P53 --> P56
P53 --> P57
P53 --> P59
P53 --> P61
P53 --> P63
P53 --> P65
P53 --> P67
P53 --> P69
P53 --> P90
P53 --> P91
P54["[treasureCaveOne]"]
P54 --> P56
P54 --> P57
P54 --> P59
P54 --> P61
P54 --> P63
P54 --> P65
P54 --> P67
P54 --> P90
P54 --> P91
P55["[treasureCaveMany]"]
P55 --> P56
P55 --> P57
P55 --> P59
P55 --> P61
P55 --> P63
P55 --> P65
P55 --> P67
P55 --> P90
P55 --> P91
P56["[spawnIsHq]"]
P56 --> P58
P57["[findHq]"]
P57 --> P58
P58["We established our Rock Raider HQ, but<br/>We constructed our base and were ready to begin mining. Unfortunately,"]
P58 --> P59
P58 --> P61
P58 --> P63
P58 --> P65
P58 --> P67
P58 --> P90
P58 --> P91
P59["[nomadsOne]"]
P59 --> P60
P60["a teleporter malfunction sent this Rock Raider to an uncharted cavern.<br/>the teleporter on the L.M.S. Explorer has been acting up again and one of our Rock Raiders is trapped in an uncharted cavern.<br/>one of our Rock Raiders was accidentally sent to the wrong cavern!"]
P60 --> P119
P60 --> P121
P60 --> P125
P61["[nomadsMany]"]
P61 --> P62
P62["a teleporter malfunction sent a group of our Rock Raiders to an uncharted cavern.<br/>the teleporter on the L.M.S. Explorer has been acting up again and a group of our Rock Raiders ended up in an uncharted cavern."]
P62 --> P119
P62 --> P121
P62 --> P125
P63["[lostMinersOne]"]
P63 --> P64
P64["a teleporter malfunction sent one of our Rock Raiders to a cavern near here.<br/>the teleporter on the L.M.S. Explorer has been acting up again and one of our Rock Raiders is trapped in an uncharted cavern.<br/>one of our Rock Raiders was accidentally sent to the wrong cavern!"]
P64 --> P87
P64 --> P89
P64 --> P119
P64 --> P121
P64 --> P125
P65["[lostMinersTogether]"]
P65 --> P66
P66["a teleporter malfunction sent a group of our Rock Raiders to a cavern near here.<br/>the teleporter on the L.M.S. Explorer has been acting up again and a group of our Rock Raiders ended up in an uncharted cavern."]
P66 --> P87
P66 --> P89
P66 --> P119
P66 --> P121
P66 --> P125
P67["[lostMinersApart]"]
P67 --> P68
P68["a teleporter malfunction scattered one of our Rock Raiders throughout this cavern.<br/>the teleporters have failed again and one groups of Rock Raiders are lost somewhere in this cavern."]
P68 --> P87
P68 --> P89
P68 --> P119
P68 --> P121
P68 --> P125
P69["[hqIsRuin]"]
P69 --> P70
P69 --> P71
P69 --> P72
P69 --> P73
P69 --> P74
P69 --> P75
P69 --> P77
P70["[treasureCaveOne]"]
P70 --> P72
P70 --> P73
P70 --> P74
P70 --> P75
P70 --> P77
P71["[treasureCaveMany]"]
P71 --> P72
P71 --> P73
P71 --> P74
P71 --> P75
P71 --> P77
P72["[buildAndPowerGcOne]"]
P72 --> P74
P72 --> P75
P72 --> P77
P73["[buildAndPowerGcMultiple]"]
P73 --> P74
P73 --> P75
P73 --> P77
P74["[hasSlugs]"]
P74 --> P75
P74 --> P77
P75["[hasMonsters]"]
P75 --> P76
P76["A horde of {enemies} attacked our Rock Raider HQ"]
P76 --> P78
P76 --> P126
P77["Recent seismic activity has damaged our Rock Raider HQ<br/>An earthquake in this area has caused several cave-ins and destroyed part of our Rock Raider HQ"]
P77 --> P78
P77 --> P126
P78[", and"]
P78 --> P79
P78 --> P80
P78 --> P81
P78 --> P83
P78 --> P85
P78 --> P96
P78 --> P97
P79["[spawnIsHq]"]
P79 --> P81
P79 --> P83
P79 --> P85
P79 --> P96
P79 --> P97
P80["[findHq]"]
P80 --> P81
P80 --> P83
P80 --> P85
P80 --> P96
P80 --> P97
P81["[lostMinersOne]"]
P81 --> P82
P82["one of our Rock Raiders is missing."]
P82 --> P87
P82 --> P89
P82 --> P121
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P135
P82 --> P139
P82 --> P139
P82 --> P139
P82 --> P139
P82 --> P139
P82 --> P139
P82 --> P139
P82 --> P139
P82 --> P139
P82 --> P139
P82 --> P139
P82 --> P139
P82 --> P139
P82 --> P139
P82 --> P139
P82 --> P139
P82 --> P142
P82 --> P142
P82 --> P142
P82 --> P142
P82 --> P142
P82 --> P142
P82 --> P142
P82 --> P142
P82 --> P145
P82 --> P145
P82 --> P145
P82 --> P145
P82 --> P147
P82 --> P147
P82 --> P147
P82 --> P147
P82 --> P150
P82 --> P150
P82 --> P154
P83["[lostMinersTogether]"]
P83 --> P84
P84["a group of Rock Raidiers are missing.<br/>a group of Rock Raidiers are trapped somewhere in the cavern."]
P84 --> P87
P84 --> P89
P84 --> P121
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P135
P84 --> P139
P84 --> P139
P84 --> P139
P84 --> P139
P84 --> P139
P84 --> P139
P84 --> P139
P84 --> P139
P84 --> P139
P84 --> P139
P84 --> P139
P84 --> P139
P84 --> P139
P84 --> P139
P84 --> P139
P84 --> P139
P84 --> P142
P84 --> P142
P84 --> P142
P84 --> P142
P84 --> P142
P84 --> P142
P84 --> P142
P84 --> P142
P84 --> P145
P84 --> P145
P84 --> P145
P84 --> P145
P84 --> P147
P84 --> P147
P84 --> P147
P84 --> P147
P84 --> P150
P84 --> P150
P84 --> P154
P85["[lostMinersApart]"]
P85 --> P86
P86["some of our Rock Raidiers are missing.<br/>our Rock Raiders are trapped throughout the cavern."]
P86 --> P87
P86 --> P89
P86 --> P121
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P135
P86 --> P139
P86 --> P139
P86 --> P139
P86 --> P139
P86 --> P139
P86 --> P139
P86 --> P139
P86 --> P139
P86 --> P139
P86 --> P139
P86 --> P139
P86 --> P139
P86 --> P139
P86 --> P139
P86 --> P139
P86 --> P139
P86 --> P142
P86 --> P142
P86 --> P142
P86 --> P142
P86 --> P142
P86 --> P142
P86 --> P142
P86 --> P142
P86 --> P145
P86 --> P145
P86 --> P145
P86 --> P145
P86 --> P147
P86 --> P147
P86 --> P147
P86 --> P147
P86 --> P150
P86 --> P150
P86 --> P154
P87["[hasMonsters]"]
P87 --> P88
P88["we need to find them before the {enemies} do.<br/>I hope they don't meet any of the {enemies} roaming this cavern."]
P88 --> P105
P88 --> P106
P88 --> P107
P88 --> P109
P88 --> P114
P88 --> P206
P88 --> P207
P88 --> P234
P89["we're counting on you to find them!<br/>we don't know how long they'll last out there."]
P89 --> P105
P89 --> P106
P89 --> P107
P89 --> P109
P89 --> P114
P89 --> P206
P89 --> P207
P89 --> P234
P90["[nomadsOne]"]
P90 --> P92
P90 --> P93
P90 --> P94
P91["[nomadsMany]"]
P91 --> P92
P91 --> P93
P91 --> P94
P92["[lostMinersOne]"]
P92 --> P95
P93["[lostMinersTogether]"]
P93 --> P95
P94["[lostMinersApart]"]
P94 --> P95
P95["a teleporter malfunction left our Rock Raiders scattered throughout this cavern."]
P95 --> P102
P95 --> P104
P95 --> P119
P95 --> P121
P95 --> P125
P96["[nomadsOne]"]
P96 --> P98
P96 --> P99
P96 --> P100
P97["[nomadsMany]"]
P97 --> P98
P97 --> P99
P97 --> P100
P98["[lostMinersOne]"]
P98 --> P101
P99["[lostMinersTogether]"]
P99 --> P101
P100["[lostMinersApart]"]
P100 --> P101
P101["our Rock Raiders have been scattered throughout this cavern."]
P101 --> P102
P101 --> P104
P101 --> P121
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P135
P101 --> P139
P101 --> P139
P101 --> P139
P101 --> P139
P101 --> P139
P101 --> P139
P101 --> P139
P101 --> P139
P101 --> P139
P101 --> P139
P101 --> P139
P101 --> P139
P101 --> P139
P101 --> P139
P101 --> P139
P101 --> P139
P101 --> P142
P101 --> P142
P101 --> P142
P101 --> P142
P101 --> P142
P101 --> P142
P101 --> P142
P101 --> P142
P101 --> P145
P101 --> P145
P101 --> P145
P101 --> P145
P101 --> P147
P101 --> P147
P101 --> P147
P101 --> P147
P101 --> P150
P101 --> P150
P101 --> P154
P102["[hasMonsters]"]
P102 --> P103
P103["you need to find the others before the {enemies} do."]
P103 --> P105
P103 --> P106
P103 --> P107
P103 --> P109
P103 --> P114
P103 --> P206
P103 --> P207
P103 --> P234
P104["we're counting on you to find the others!"]
P104 --> P105
P104 --> P106
P104 --> P107
P104 --> P109
P104 --> P114
P104 --> P206
P104 --> P207
P104 --> P234
P105["[spawnHasErosion]"]
P105 --> P106
P105 --> P107
P105 --> P109
P105 --> P114
P105 --> P206
P105 --> P207
P105 --> P234
P106["[hasSlugs]"]
P106 --> P107
P106 --> P109
P106 --> P114
P106 --> P206
P106 --> P207
P106 --> P234
P107["[anchorIsGasLeak]"]
P107 --> P108
P108["Our geologists have warned me that the air in this cavern contains a gas that reacts explosively with plasma, so we can'trely on Electric Fences."]
P108 --> P114
P108 --> P206
P108 --> P207
P108 --> P234
P109["[anchorIsOreWaste]"]
P109 --> P110
P110["This cavern has very little ore, so build only what you really need"]
P110 --> P111
P110 --> P113
P111["[anchorIsGasLeak]"]
P111 --> P112
P112[" - and no Electric Fences either. The atmosphere here would likely react with plasma... explosively."]
P112 --> P114
P112 --> P206
P112 --> P207
P112 --> P234
P113["!"]
P113 --> P114
P113 --> P206
P113 --> P207
P113 --> P234
P114["[anchorIsBlackout]"]
P114 --> P115
P115["\\n\nOne more thing to look out for: We're picking up some unusal magnetic disturbances"]
P115 --> P116
P115 --> P117
P115 --> P205
P116["[buildAndPowerGcOne]"]
P116 --> P118
P117["[buildAndPowerGcMultiple]"]
P117 --> P118
P118[". Perhaps while you're down there, you can extend the range of our scanners."]
P118 --> P234
P119["[hqIsFixedComplete]"]
P119 --> P120
P120["While the teleporters have been repaired, they are operating in a low-power mode and cannot send down any buildings.<br/>We cannot risk running the teleporters at full power, so you will have to make do with the buildings that are already there."]
P120 --> P121
P121["Also,<br/>If that wasn't hard enough,<br/>It gets worse:"]
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P135
P121 --> P139
P121 --> P139
P121 --> P139
P121 --> P139
P121 --> P139
P121 --> P139
P121 --> P139
P121 --> P139
P121 --> P139
P121 --> P139
P121 --> P139
P121 --> P139
P121 --> P139
P121 --> P139
P121 --> P139
P121 --> P139
P121 --> P142
P121 --> P142
P121 --> P142
P121 --> P142
P121 --> P142
P121 --> P142
P121 --> P142
P121 --> P142
P121 --> P145
P121 --> P145
P121 --> P145
P121 --> P145
P121 --> P147
P121 --> P147
P121 --> P147
P121 --> P147
P121 --> P150
P121 --> P150
P121 --> P154
P122["[spawnIsHq]"]
P122 --> P123
P123[", and we have established our Rock Raider HQ.<br/>, and our HQ is ready to go!"]
P123 --> P124
P123 --> P234
P124["\\n\nHowever,<br/>\\n\nUnfortunately,<br/>\\n\nUnfortunately for us,<br/>\\n\nThe bad news?<br/>Don't be fooled, though.<br/>I do ask that you be careful down there!"]
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P135
P124 --> P139
P124 --> P139
P124 --> P139
P124 --> P139
P124 --> P139
P124 --> P139
P124 --> P139
P124 --> P139
P124 --> P139
P124 --> P139
P124 --> P139
P124 --> P139
P124 --> P139
P124 --> P139
P124 --> P139
P124 --> P139
P124 --> P142
P124 --> P142
P124 --> P142
P124 --> P142
P124 --> P142
P124 --> P142
P124 --> P142
P124 --> P142
P124 --> P145
P124 --> P145
P124 --> P145
P124 --> P145
P124 --> P147
P124 --> P147
P124 --> P147
P124 --> P147
P124 --> P150
P124 --> P150
P124 --> P154
P125["Our engineers have assured us the teleporters have been repaired, but<br/>While the teleporters are back in working order,"]
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P135
P125 --> P139
P125 --> P139
P125 --> P139
P125 --> P139
P125 --> P139
P125 --> P139
P125 --> P139
P125 --> P139
P125 --> P139
P125 --> P139
P125 --> P139
P125 --> P139
P125 --> P139
P125 --> P139
P125 --> P139
P125 --> P139
P125 --> P142
P125 --> P142
P125 --> P142
P125 --> P142
P125 --> P142
P125 --> P142
P125 --> P142
P125 --> P142
P125 --> P145
P125 --> P145
P125 --> P145
P125 --> P145
P125 --> P147
P125 --> P147
P125 --> P147
P125 --> P147
P125 --> P150
P125 --> P150
P125 --> P154
P126[". We were able to evacuate in time<br/>. All of our Rock Raiders made it out<br/>. We evacuated the cavern<br/>. Everyone evacuated safely"]
P126 --> P127
P126 --> P133
P127["[findHq]"]
P127 --> P128
P127 --> P130
P127 --> P132
P128["[nomadsOne]"]
P128 --> P129
P129[", but we can't get you any closer than this.<br/>, but we cannot risk teleporting you in any closer than this.<br/>, and we want you to return to the base and salvage what's left of it."]
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P135
P129 --> P139
P129 --> P139
P129 --> P139
P129 --> P139
P129 --> P139
P129 --> P139
P129 --> P139
P129 --> P139
P129 --> P139
P129 --> P139
P129 --> P139
P129 --> P139
P129 --> P139
P129 --> P139
P129 --> P139
P129 --> P139
P129 --> P142
P129 --> P142
P129 --> P142
P129 --> P142
P129 --> P142
P129 --> P142
P129 --> P142
P129 --> P142
P129 --> P145
P129 --> P145
P129 --> P145
P129 --> P145
P129 --> P147
P129 --> P147
P129 --> P147
P129 --> P147
P129 --> P150
P129 --> P150
P129 --> P154
P129 --> P234
P130["[nomadsMany]"]
P130 --> P131
P131[", and you'll be leading the salvage team.<br/>, and this is the team that will restore our operations."]
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P135
P131 --> P139
P131 --> P139
P131 --> P139
P131 --> P139
P131 --> P139
P131 --> P139
P131 --> P139
P131 --> P139
P131 --> P139
P131 --> P139
P131 --> P139
P131 --> P139
P131 --> P139
P131 --> P139
P131 --> P139
P131 --> P139
P131 --> P142
P131 --> P142
P131 --> P142
P131 --> P142
P131 --> P142
P131 --> P142
P131 --> P142
P131 --> P142
P131 --> P145
P131 --> P145
P131 --> P145
P131 --> P145
P131 --> P147
P131 --> P147
P131 --> P147
P131 --> P147
P131 --> P150
P131 --> P150
P131 --> P154
P131 --> P234
P132[", but this is as close as we can get for now.<br/>, but without the homing beacon we don't want to risk teleporting anyone directly inside."]
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P135
P132 --> P139
P132 --> P139
P132 --> P139
P132 --> P139
P132 --> P139
P132 --> P139
P132 --> P139
P132 --> P139
P132 --> P139
P132 --> P139
P132 --> P139
P132 --> P139
P132 --> P139
P132 --> P139
P132 --> P139
P132 --> P139
P132 --> P142
P132 --> P142
P132 --> P142
P132 --> P142
P132 --> P142
P132 --> P142
P132 --> P142
P132 --> P142
P132 --> P145
P132 --> P145
P132 --> P145
P132 --> P145
P132 --> P147
P132 --> P147
P132 --> P147
P132 --> P147
P132 --> P150
P132 --> P150
P132 --> P154
P132 --> P234
P133["[spawnIsHq]"]
P133 --> P134
P134[", but this is all that's left.<br/>and now we need to pick up the pieces and try again."]
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P135
P134 --> P139
P134 --> P139
P134 --> P139
P134 --> P139
P134 --> P139
P134 --> P139
P134 --> P139
P134 --> P139
P134 --> P139
P134 --> P139
P134 --> P139
P134 --> P139
P134 --> P139
P134 --> P139
P134 --> P139
P134 --> P139
P134 --> P142
P134 --> P142
P134 --> P142
P134 --> P142
P134 --> P142
P134 --> P142
P134 --> P142
P134 --> P142
P134 --> P145
P134 --> P145
P134 --> P145
P134 --> P145
P134 --> P147
P134 --> P147
P134 --> P147
P134 --> P147
P134 --> P150
P134 --> P150
P134 --> P154
P134 --> P234
P135["[spawnHasErosion]"]
P135 --> P136
P135 --> P137
P136["we are dangerously close to a cavern full of lava. Left unchecked, this whole area could be consumed by molten rock!"]
P136 --> P234
P137["we are concerned about nearby lava flows that could engulf this cavern<br/>you will need to keep an eye on the volcanic activity in this cavern to avoid being buried in lava"]
P137 --> P138
P137 --> P141
P137 --> P144
P137 --> P149
P137 --> P153
P137 --> P157
P138["and"]
P138 --> P139
P139["[anchorIsBlackout]"]
P139 --> P140
P140["the unusual magnetic properties of the rock here might interfere with our equipment<br/>there are unusual magnetic readings in this cavern and we're concerned about the effects that might have on our equipment"]
P140 --> P141
P140 --> P141
P140 --> P144
P140 --> P144
P140 --> P149
P140 --> P149
P140 --> P153
P140 --> P153
P140 --> P157
P140 --> P157
P141["and"]
P141 --> P142
P142["[anchorIsOreWaste]"]
P142 --> P143
P143["the rock in this cavern has very little ore"]
P143 --> P144
P143 --> P144
P143 --> P149
P143 --> P149
P143 --> P153
P143 --> P153
P143 --> P157
P143 --> P157
P144["and"]
P144 --> P145
P144 --> P147
P145["[hasMonsters]"]
P145 --> P146
P145 --> P148
P146["[hasSlugs]"]
P146 --> P148
P147["[hasSlugs]"]
P147 --> P148
P148["the tunnels here are full of large creatures that threaten our operations<br/>we are picking up signs of large creatures in the area<br/>this cavern is inhabited by nests of {enemies}<br/>we have reason to believe there are dozens of {enemies} just out of sight"]
P148 --> P149
P148 --> P149
P148 --> P153
P148 --> P153
P148 --> P157
P148 --> P157
P149["and"]
P149 --> P150
P150["[anchorIsGasLeak]"]
P150 --> P151
P151["the atmosphere in this cavern contains a toxic gas that might explode when exposed to plasma"]
P151 --> P152
P152[" - which means we cannot rely on Electric Fences.<br/>. While our laser weapons should be fine, a single Electric Fence could blast us all into tiny bits of ABS."]
P152 --> P234
P153["and"]
P153 --> P154
P154["[hqIsFixedComplete]"]
P154 --> P155
P155["the teleporters are operating in a low-power mode, so"]
P155 --> P156
P156["you will not be able to construct any more buildings.<br/>you must make do with the buildings that are already constructed."]
P156 --> P234
P157["."]
P157 --> P234
P158["[hasSlugs]"]
P158 --> P159
P159["We were all set to mine this cavern, but the team was scared off by a Slimy Slug that suddenly appeared in the middle of our HQ. They even left without recording their location properly.<br/>There should be a base near here, but it's not showing up on our scanners. Some interference from {enemies} must have shut off its location beacon! To be safe, we're sending you to a nearby cavern instead."]
P159 --> P234
P160["A forward team has established Rock Raider HQ in the viscinity, but we haven't had the means to use it yet.<br/>There should be a base near here primed and ready for our mining operations, but our teleporters are unable to get a lock on it for some reason.<br/>We've had our eyes on this region and were all set to mine here. Unfortunately, the signed copy of Form 27b-6 went missing below a desk, we forgot about it, and now we aren't exactly sure where that base is."]
P160 --> P234
P161["[nomadsOne]"]
P161 --> P162
P162[". Your mission is to find a suitable location for our Rock Raider HQ."]
P162 --> P165
P162 --> P167
P162 --> P169
P162 --> P234
P163["[nomadsMany]"]
P163 --> P164
P164[". We haven't yet chosen where to establish our base, so I'm leaving that decision to you.<br/>, and I've picked this team to decide where to build our HQ."]
P164 --> P165
P164 --> P167
P164 --> P169
P164 --> P234
P165["[hasMonsters]"]
P165 --> P166
P165 --> P168
P166["[hasSlugs]"]
P166 --> P168
P167["[hasSlugs]"]
P167 --> P168
P168["\\n\nBe on the lookout for {enemies}, especially once you start construction.<br/>Use caution! There may be {enemies} afoot and I don't want you taking any unnecessary risk."]
P168 --> P169
P168 --> P234
P169["[spawnHasErosion]"]
P169 --> P234
P170["[anchorIsMobFarm]"]
P170 --> P171
P171["We discovered this incredible cave with the abundance of Energy Crystals you now see before you.<br/>As you can see, we have located a cave with an absurd number of Energy Crystals."]
P171 --> P172
P172["We meant to teleport you onto that island, but something is interfering with the signal.<br/>That many Energy Crystals in one place seems to be interfering with our teleporters."]
P172 --> P173
P173["We are extremely limited in what vehicles we can send down to you, so you'll have to get the crystals some other way."]
P173 --> P174
P173 --> P175
P173 --> P176
P173 --> P177
P173 --> P178
P173 --> P179
P173 --> P234
P174["[hasMonsters]"]
P174 --> P175
P174 --> P176
P174 --> P177
P174 --> P178
P174 --> P179
P174 --> P234
P175["[hasSlugs]"]
P175 --> P176
P175 --> P177
P175 --> P178
P175 --> P179
P175 --> P234
P176["[spawnHasErosion]"]
P176 --> P177
P176 --> P178
P176 --> P179
P176 --> P234
P177["[treasureCaveOne]"]
P177 --> P179
P177 --> P234
P178["[treasureCaveMany]"]
P178 --> P179
P178 --> P234
P179["\\n\nThere's one more thing - "]
P179 --> P180
P179 --> P181
P179 --> P183
P179 --> P186
P180["you aren't the first to arrive here."]
P180 --> P181
P180 --> P183
P180 --> P186
P181["[lostMinersApart]"]
P181 --> P182
P182["Some of our Rock Raiders were scattered a bit further away from the island. By our readings, they seem to be in separate caverns nearby"]
P182 --> P188
P183["[lostMinersTogether]"]
P183 --> P184
P184["We already sent a team down here, but they failed to check in"]
P184 --> P185
P184 --> P188
P185[". We believe they are stranded in a nearby cavern"]
P185 --> P188
P186["[lostMinersOne]"]
P186 --> P187
P187["One of our Rock Raiders was teleported to another cavern somewhere near here<br/>One of our Rock Raiders didn't come down with the group. They should be somewhere nearby"]
P187 --> P188
P188["and we're counting on you to rescue them!<br/>. I know I can count on you to reach them.<br/>."]
P188 --> P234
P189["[anchorIsPandora]"]
P189 --> P190
P190["We've located an unusual cavern with a massive cache of Energy Crystals. Of course, it couldn't be that easy - the cavern has more monsters than we've ever seen before!<br/>The bounty before your eyes is one of the largest loose crystal deposits I've ever seen, and it is, unfortunately, guarded by an army of {monsters}."]
P190 --> P191
P191["Our scouts report they seem a bit shy and probably won't bother us unless we disturb the Energy Crystals here.<br/>Early scouting of this area suggests the {monsters} are fairly docile and won't attack as long as we aren't disturbing their food source."]
P191 --> P192
P191 --> P194
P191 --> P196
P191 --> P197
P191 --> P200
P191 --> P201
P191 --> P202
P191 --> P203
P191 --> P204
P191 --> P234
P192["[hasSlugs]"]
P192 --> P193
P193["The Slimy Slugs here might be a problem, though."]
P193 --> P194
P193 --> P196
P193 --> P197
P193 --> P200
P193 --> P201
P193 --> P202
P193 --> P203
P193 --> P204
P193 --> P234
P194["[lostMinersOne]"]
P194 --> P195
P195["\\n\nOne of the scouts"]
P195 --> P199
P196["[lostMinersTogether]"]
P196 --> P198
P197["[lostMinersApart]"]
P197 --> P198
P198["\\n\nThe team"]
P198 --> P199
P199["hasn't reported back yet, so we're sending you to find them."]
P199 --> P200
P199 --> P201
P199 --> P202
P199 --> P203
P199 --> P204
P199 --> P234
P200["[treasureCaveOne]"]
P200 --> P202
P200 --> P203
P200 --> P204
P200 --> P234
P201["[treasureCaveMany]"]
P201 --> P202
P201 --> P203
P201 --> P204
P201 --> P234
P202["[spawnHasErosion]"]
P202 --> P203
P202 --> P204
P202 --> P234
P203["[hasGiantCave]"]
P203 --> P204
P203 --> P234
P204["[hasMonsters]"]
P204 --> P234
P205[", so be prepared for anything.<br/>, so be careful down there!"]
P205 --> P234
P206["[buildAndPowerGcOne]"]
P206 --> P208
P207["[buildAndPowerGcMultiple]"]
P207 --> P208
P208["\\n\nWhile you're down there, we need you to extend the range of our scanners."]
P208 --> P234
P209["[hasGiantCave]"]
P209 --> P210
P209 --> P211
P209 --> P212
P210["[floodedWithWater]"]
P210 --> P212
P211["[floodedWithLava]"]
P211 --> P212
P212["We've got news for you, Rock Raider! Our geological scanners have discovered a nearby cave approximately the size of \"yes\"."]
P212 --> P213
P212 --> P214
P212 --> P215
P212 --> P216
P212 --> P217
P212 --> P218
P212 --> P219
P212 --> P220
P212 --> P221
P212 --> P222
P212 --> P223
P212 --> P224
P212 --> P234
P213["[hasMonsters]"]
P213 --> P214
P213 --> P215
P213 --> P216
P213 --> P217
P213 --> P218
P213 --> P219
P213 --> P220
P213 --> P221
P213 --> P222
P213 --> P223
P213 --> P224
P213 --> P234
P214["[hasSlugs]"]
P214 --> P215
P214 --> P216
P214 --> P217
P214 --> P218
P214 --> P219
P214 --> P220
P214 --> P221
P214 --> P222
P214 --> P223
P214 --> P224
P214 --> P234
P215["[spawnHasErosion]"]
P215 --> P216
P215 --> P217
P215 --> P218
P215 --> P219
P215 --> P220
P215 --> P221
P215 --> P222
P215 --> P223
P215 --> P224
P215 --> P234
P216["[spawnIsHq]"]
P216 --> P218
P216 --> P219
P216 --> P220
P216 --> P221
P216 --> P222
P216 --> P223
P216 --> P224
P216 --> P234
P217["[findHq]"]
P217 --> P218
P217 --> P219
P217 --> P220
P217 --> P221
P217 --> P222
P217 --> P223
P217 --> P224
P217 --> P234
P218["[treasureCaveOne]"]
P218 --> P220
P218 --> P221
P218 --> P222
P218 --> P223
P218 --> P224
P218 --> P234
P219["[treasureCaveMany]"]
P219 --> P220
P219 --> P221
P219 --> P222
P219 --> P223
P219 --> P224
P219 --> P234
P220["[nomadsOne]"]
P220 --> P223
P220 --> P224
P220 --> P234
P221["[nomadsMany]"]
P221 --> P223
P221 --> P224
P221 --> P234
P222["[anchorIsBlackout]"]
P222 --> P223
P222 --> P224
P222 --> P234
P223["[buildAndPowerGcOne]"]
P223 --> P234
P224["[buildAndPowerGcMultiple]"]
P224 --> P234
P225["[floodedWithWater]"]
P225 --> P226
P226["[lostMinersOne]"]
P226 --> P227
P227["[spawnIsHq]"]
P227 --> P228
P228["A man has fallen into the river under Planet U!\\n\nBuild the Docks! Build the Rapid Rider and off to the rescue. Follow the shoreline! Find the missing Rock Raider!"]
P228 --> P229
P228 --> P230
P228 --> P231
P228 --> P232
P228 --> P233
P228 --> P234
P229["[hasMonsters]"]
P229 --> P230
P229 --> P231
P229 --> P232
P229 --> P233
P229 --> P234
P230["[hasSlugs]"]
P230 --> P231
P230 --> P232
P230 --> P233
P230 --> P234
P231["[spawnHasErosion]"]
P231 --> P232
P231 --> P233
P231 --> P234
P232["[treasureCaveOne]"]
P232 --> P234
P233["[treasureCaveMany]"]
P233 --> P234
P234["[end]"]
```