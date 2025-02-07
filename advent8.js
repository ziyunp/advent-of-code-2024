const getAntennasMap = (map) => {
  const antennasMap = {};
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] !== ".") {
        const freq = map[i][j];
        if (antennasMap[freq] === undefined) {
          antennasMap[freq] = [];
        }
        antennasMap[freq].push([i, j]);
      }
    }
  }
  return antennasMap;
};
const isValid = (location, mapSize) => {
  return (
    location[0] >= 0 &&
    location[0] < mapSize[0] &&
    location[1] >= 0 &&
    location[1] < mapSize[1]
  );
};
const part1 = (data) => {
  const processed = processData(data);
  const mapSize = [processed.length, processed[0].length];

  // Get antennas location by type
  const antennasMap = getAntennasMap(processed);
  // find antidotes for each freq
  const antinodes = new Set();
  for (const [freq, locations] of Object.entries(antennasMap)) {
    for (let i = 0; i < locations.length - 1; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const loc1 = locations[i];
        const loc2 = locations[j];
        // (1, 8) (2, 5) dist = 1, -3
        // (2, 5) (3, 7) dist = 1, 2
        const distanceX = loc2[0] - loc1[0];
        const distanceY = loc2[1] - loc1[1];
        const antinode1 = [loc1[0] - distanceX, loc1[1] - distanceY];
        const antinode2 = [loc2[0] + distanceX, loc2[1] + distanceY];
        if (isValid(antinode1, mapSize)) {
          antinodes.add(antinode1.join(","));
        }
        if (isValid(antinode2, mapSize)) {
          antinodes.add(antinode2.join(","));
        }
      }
    }
  }
  console.log("ans", antinodes.size);
  return antinodes.size;
};

const part2 = (data) => {
  const processed = processData(data);
  const mapSize = [processed.length, processed[0].length];

  // Get antennas location by type
  const antennasMap = getAntennasMap(processed);
  // find antidotes for each freq
  const antinodes = new Set();
  for (const [freq, locations] of Object.entries(antennasMap)) {
    for (let i = 0; i < locations.length - 1; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const loc1 = locations[i];
        const loc2 = locations[j];

        // include antenna's locations
        antinodes.add(loc1.join(","));
        antinodes.add(loc2.join(","));
        const distanceX = loc2[0] - loc1[0];
        const distanceY = loc2[1] - loc1[1];
        // (1, 8) (2, 5) dist = 1, -3
        // (2, 5) (3, 7) dist = 1, 2
        let isOutOfBound = false,
          multiple = 1;

        // loc2 add multiples until out of bound
        while (!isOutOfBound) {
          const antinode = [
            loc2[0] + distanceX * multiple,
            loc2[1] + distanceY * multiple,
          ];
          if (isValid(antinode, mapSize)) {
            antinodes.add(antinode.join(","));
            multiple++;
          } else {
            isOutOfBound = true;
          }
        }

        // loc1 minus multiples until out of bound
        // reset
        isOutOfBound = false;
        multiple = 1;

        while (!isOutOfBound) {
          const antinode = [
            loc1[0] - distanceX * multiple,
            loc1[1] - distanceY * multiple,
          ];
          if (isValid(antinode, mapSize)) {
            antinodes.add(antinode.join(","));
            multiple++;
          } else {
            isOutOfBound = true;
          }
        }
      }
    }
  }
  return antinodes.size;
};

const processData = (data) => {
  const lines = data.split("\n");
  return lines.map((line) => line.split(""));
};
const test = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;
const puzzle = `.E..........m..0N.........f.......................
........N........P0...............................
.......j..................................F.......
........1j............P........................C..
...........................3..K......f..........E.
...........V...y...0.....................F........
1.......j.....P....y.N.......................F....
....................m...................C.........
..L......P....p..................w.m..............
............E......p..AU........8......f..........
..............C...............w....d..............
j1...............E..........3.........f........w..
.................p...A..........3.................
.................3..p........KU...w..r..F.........
7.........y........8.......................r......
........y..u......K...............................
...1..................8....C...K..................
...........h.......................6..............
......................U.........A.r..t........6...
...........5.........8..c.........................
.................U................t...............
.....L...O...................t.............d......
.........7........................................
......L..H...c.....9....t.................6.......
...........................c.M..................4.
.....R..7...O.....................................
.......................9......................d...
..................................................
.........L..9...R..........................6c.....
..M.....T.5.................................d.....
.......5OR...................T....................
.......D......o.........v...................r.....
...u....o.........5...............................
.......WR.....Y...........................e...4...
T............O......M..................4..a.......
.Y...................M............................
........W..D...............oh............e........
.......7......Do...................A...e.......4..
.W...Y..D........................h...v..........e.
..........V.....9.l.......h.......a.........n..v..
.......................H.....a2...................
..................................................
...V............Y....J..H2................vn......
..............................H2.................n
................V..........l...........k..........
.T..u........................J...ak...............
..................J.....l.........................
.................l................................
......u.........................................n.
......................J..k............2...........`;
part2(puzzle);
