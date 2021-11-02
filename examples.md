deno run -A --unstable ren.ts --show "ocean_" "beach_{10..11}" data/ocean_{1,2}.png

> ocean_1.png -> beach_101.png
> ocean_2.png -> beach_112.png

deno run -A --unstable ren.ts --show "ocean_" "beach_" data/ocean_{1,2}.png

> ocean_1.png -> beach_1.png
> ocean_2.png -> beach_2.png

deno run -A --unstable ren.ts --show "*" "beach_" data/ocean_{1,2}.png

> ocean_1.png -> beach_
> ocean_2.png -> beach_

deno run -A --unstable ren.ts --show "*" "beach_{1..2}.png" data/ocean_{1,2}.png

> ocean_1.png -> beach_1.png
> ocean_2.png -> beach_2.png


deno run -A --unstable ren.ts --show "" "beach_{1..2}.png" data/ocean_{1,2}.png

# ignore
> ocean_1.png -> beach_1.png
> ocean_2.png -> beach_2.png

deno run -A --unstable ren.ts --show "*" "{1..2}beach.png" data/ocean_{1,2}.png

# ignore
> ocean_1.png -> 1beach.png
> ocean_2.png -> 2beach.png


## Advanced examples


deno run -A --unstable ren.ts --show "ocean_[1-2]" "beach" data/ocean_{1,2}.png
deno run -A --unstable ren.ts --show "ocean_[1,2]" "beach" data/ocean_{1,2}.png
deno run -A --unstable ren.ts --show "ocean_[1-3]" "beach" data/ocean_{1,2}.png
deno run -A --unstable ren.ts --show "ocean_[1-3]" "beach{1..3}" data/ocean_{1,2}.png





1. element find only text to change

2. second is for expansion
feature expansion {1..2} on second parameter