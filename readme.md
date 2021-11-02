# ren

rename multiples files with command `ren` 🤼‍♂️

## Usage

* `ren.ts {old_string} {new_string} {files}`| `*.txt`
* `ren.ts --show`  # show rename files
* `ren.ts --force`  # rename files
* `ren.ts`  # defaut copy files with new name


## Install
`
./install.ts
`




## examples

```
deno run -A --unstable ren.ts --show "ocean_" "beach_{10..11}" data/ocean_{1,2}.png
```



<p><code>
> ocean_1.png -> beach_101.png
</code>
</br>
<code>
> ocean_2.png -> beach_112.png
</code>
</p>

```
deno run -A --unstable ren.ts --show "ocean_" "beach_" data/ocean_{1,2}.png
```

<p><code>
> ocean_1.png -> beach_1.png
</code>
</br>
<code>
> ocean_2.png -> beach_2.png
</code>
</p>

```
deno run -A --unstable ren.ts --show "*" "beach_" data/ocean_{1,2}.png
```

<p><code>
> ocean_1.png -> beach_
</code>
</br>
<code>
> ocean_2.png -> beach_
</code>
</p>


```
deno run -A --unstable ren.ts --show "*" "beach_{1..2}.png" data/ocean_{1,2}.png
```

<p><code>
> ocean_1.png -> beach_1.png
</code>
</br>
<code>
> ocean_2.png -> beach_2.png
</code>
</p>

```
deno run -A --unstable ren.ts --show "" "beach_{1..2}.png" data/ocean_{1,2}.png
```

<p>
# ignore
</br>
<code>
> ocean_1.png -> beach_1.png
</code>
</br>
<code>
> ocean_2.png -> beach_2.png
</code>
</p>

```
deno run -A --unstable ren.ts --show "*" "{1..2}beach.png" data/ocean_{1,2}.png
```

<p>
<code>
> ocean_1.png -> 1beach.png
</code>
</br>
<code>
> ocean_2.png -> 2beach.png
</code>
</p>



