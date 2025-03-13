## Mission Name

```mermaid
flowchart TD;
P0["[start]"]
P0 --> P1
P0 --> P3
P0 --> P5
P0 --> P8
P0 --> P10
P0 --> P13
P0 --> P15
P0 --> P17
P0 --> P20
P0 --> P22
P0 --> P25
P0 --> P27
P0 --> P30
P0 --> P32
P0 --> P35
P0 --> P37
P0 --> P40
P0 --> P42
P0 --> P45
P0 --> P47
P0 --> P50
P0 --> P52
P0 --> P54
P0 --> P58
P0 --> P60
P0 --> P63
P0 --> P65
P0 --> P69
P0 --> P71
P1["[rockBiome]"]
P1 --> P2
P2["Amethyst<br/>Andesite<br/>Anthracite<br/>Argillite"]
P2 --> P7
P3["[iceBiome]"]
P3 --> P4
P4["Arctic<br/>Avalanche"]
P4 --> P7
P5["[lavaBiome]"]
P5 --> P6
P6["Asbestos<br/>Ashen"]
P6 --> P7
P7["Abyss<br/>Action<br/>Alley<br/>Attack"]
P7 --> P75
P8["[rockBiome]"]
P8 --> P9
P9["Basalt<br/>Basanite<br/>Bauxite<br/>Boulder<br/>Breccia<br/>Bullion"]
P9 --> P12
P10["[iceBiome]"]
P10 --> P11
P11["Blizzard"]
P11 --> P12
P12["Balance<br/>Blitz<br/>Breach<br/>Break<br/>Bonanza<br/>Burrow"]
P12 --> P75
P13["[rockBiome]"]
P13 --> P14
P14["Chalk<br/>Claystone<br/>Core<br/>Crystal"]
P14 --> P19
P15["[iceBiome]"]
P15 --> P16
P16["Chilly<br/>Cold"]
P16 --> P19
P17["[lavaBiome]"]
P17 --> P18
P18["Caldera<br/>Cinder"]
P18 --> P19
P19["Calamity<br/>Caper<br/>Cavern<br/>Chaos<br/>Conflict<br/>Conundrum<br/>Cruise"]
P19 --> P75
P20["[rockBiome]"]
P20 --> P21
P21["Diamond<br/>Diorite<br/>Dolomite<br/>Dunite"]
P21 --> P24
P22["[iceBiome]"]
P22 --> P23
P23["Dichoric<br/>Drift"]
P23 --> P24
P24["Depths<br/>Dash<br/>Descent<br/>Despair<br/>Drive"]
P24 --> P75
P25["[rockBiome]"]
P25 --> P26
P26["Emerald<br/>Evaporite"]
P26 --> P29
P27["[lavaBiome]"]
P27 --> P28
P28["Ember"]
P28 --> P29
P29["Enigma<br/>Eruption<br/>Excavation<br/>Express"]
P29 --> P75
P30["[rockBiome]"]
P30 --> P31
P31["Fault Line<br/>Final<br/>Fissure<br/>Flint"]
P31 --> P34
P32["[iceBiome]"]
P32 --> P33
P33["Frostbite<br/>Frosty"]
P33 --> P34
P34["Folly<br/>Frenzy<br/>Fury"]
P34 --> P75
P35["[rockBiome]"]
P35 --> P36
P36["Garnet<br/>Giga Granite<br/>Gneiss<br/>Granite<br/>Gritstone<br/>Gypsum"]
P36 --> P39
P37["[iceBiome]"]
P37 --> P38
P38["Giga Glacier<br/>Glacial<br/>Glacier"]
P38 --> P39
P39["Gauntlet<br/>Getaway"]
P39 --> P75
P40["[iceBiome]"]
P40 --> P41
P41["Iceberg<br/>Icicle"]
P41 --> P44
P42["[lavaBiome]"]
P42 --> P43
P43["Igneous<br/>Infernal"]
P43 --> P44
P44["Impact<br/>Incursion<br/>Inset<br/>Intrusion"]
P44 --> P75
P45["[rockBiome]"]
P45 --> P46
P46["Lapis Lazuli<br/>Laterite<br/>Lignite<br/>Limestone<br/>Lithosphere"]
P46 --> P49
P47["[lavaBiome]"]
P47 --> P48
P48["Lava<br/>Lava Lake<br/>Lithic"]
P48 --> P49
P49["Labyrinth<br/>Lair<br/>Lure"]
P49 --> P75
P50["[rockBiome]"]
P50 --> P51
P51["Marble<br/>Metamorphic<br/>Mineral<br/>Mudstone"]
P51 --> P56
P51 --> P57
P52["[iceBiome]"]
P52 --> P53
P53["Mammoth"]
P53 --> P56
P53 --> P57
P54["[lavaBiome]"]
P54 --> P55
P55["Mafic<br/>Magma<br/>Mantle<br/>Molten"]
P55 --> P56
P55 --> P57
P56["Mine<br/>Moon"]
P56 --> P57
P57["Mayhem<br/>Maze<br/>Meltdown<br/>Menace<br/>Mishap"]
P57 --> P75
P58["[iceBiome]"]
P58 --> P59
P59["Ice Planet<br/>Permafrost<br/>Polar"]
P59 --> P62
P60["[lavaBiome]"]
P60 --> P61
P61["Pumice<br/>Pyroclastic<br/>Pyrolite"]
P61 --> P62
P62["Passage<br/>Peril<br/>Pit<br/>Plunge<br/>Puzzle"]
P62 --> P75
P63["[rockBiome]"]
P63 --> P64
P64["Sandstone<br/>Schist<br/>Sedimentary<br/>Seismic<br/>Shale<br/>Silica<br/>Silt<br/>Slate<br/>Stalactite"]
P64 --> P67
P64 --> P68
P65["[iceBiome]"]
P65 --> P66
P66["Snowdrift<br/>Sub-Zero"]
P66 --> P67
P66 --> P68
P67["Shaft"]
P67 --> P68
P68["Scramble<br/>Shock<br/>Showdown<br/>Slide"]
P68 --> P75
P69["[rockBiome]"]
P69 --> P70
P70["Tuff<br/>Turbidite<br/>Twilight"]
P70 --> P73
P70 --> P74
P71["[iceBiome]"]
P71 --> P72
P72["Taiga<br/>Titanic<br/>Tundra"]
P72 --> P73
P72 --> P74
P73["Tunnel"]
P73 --> P74
P74["Tempest<br/>Terror<br/>Trouble"]
P74 --> P75
P75["[end]"]
```