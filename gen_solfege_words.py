import sys
import subprocess
import json

print_words = True
if len(sys.argv) > 1:
    print_words = False

# Generate all combinations for simple time signatures that add up to quarter note
solf = ["ta ah ah ah", "ta ah", "sa ah ah ah", "sa ah", "ta", "sa", "tim ka", "ka tim", "sing co pa"]
manual_len = len(solf)
solf_lens = [[4]] * (manual_len - 3)
solf_lens.append([3,1])
solf_lens.append([1,3])
solf_lens.append([1,2,1])

solf_parts = {
    "tea": 0.5,     # eight note
    "ticka": 0.5,   # two sixteenths
    "teh": 0.25,
    "sea": 0.5,     # eigth rest
    "seh": 0.25      # sixteenth rest
}

solf_nums = {
    "tea": [2],     # eight note
    "ticka": [1,1],   # two sixteenths
    "teh": [1],
    "sea": [2],     # eigth rest
    "seh": [1]      # sixteenth rest
}

def is_valid(combo):
    parts = combo.split(" ")
    for i in range(len(parts) - 1):
        p = parts[i]
        n = parts[i+1]
        if p in solf_parts and n in solf_parts:
            # Can't have teh, seh, sea repeat
            if p == n and (p == "teh" or p == "seh" or p == "sea"):
                return False
            # Can't have teh ticka
            if p == "teh" and n == "ticka":
                return False
            # Can't have seh sea seh
            if p == "seh" and n == "sea" and parts[-1] == "seh":
                return False
            # teh tea teh is syncopa, don't duplicate
            if p == "teh" and n == "tea" and parts[-1] == "teh":
                return False

    return True


def solf_combos(name,num):
    combos = []
    for part in solf_parts:
        comb_name = name + ' ' + part
        comb_sum = num + solf_parts[part]
        if comb_sum == 1 and is_valid(comb_name):   # If the parts add up to quarter note, return
            combos.append(comb_name)
        elif comb_sum < 1:  # If the parts are smaller than a quarter, try and add up from there
            combos.extend(solf_combos(comb_name,comb_sum))

    return combos

for part in solf_parts:
    solf.extend(solf_combos(part,solf_parts[part]))

solf = [x.replace(' ','_') for x in solf]

def makeBeat(combo):
    parts = combo.split('_')

    beat_lengths = []
    beat_rests = []
    for part in parts:
        part_lengths = solf_nums[part]
        part_rests = [('s' in part)] * len(part_lengths)
        beat_lengths.extend(part_lengths)
        beat_rests.extend(part_rests)

    beat = {
        "name": combo,
        "lengths": beat_lengths,
        "rests": beat_rests
    }

    return beat

# TODO: Include manually set words etc
if print_words:
    beats = [makeBeat(combo) for combo in solf[manual_len:]]
    print(json.dumps(beats, indent=4, separators=(',',': ')))

    # print(json.dumps(solf, indent=4, separators=(',', ': ')))
    # for combo in solf[manual_len:]:
    #     parts = combo.split('_')
    #     part_nums = []
    #     for part in parts:
    #         part_nums.extend(solf_nums[part])
    #     solf_lens.append(part_nums)
    #
    # print(json.dumps(solf_lens, indent=4, separators=(',', ': ')))

else:
    for solf_word in solf:
        subprocess.check_output(['say','-v','Samantha','"' + solf_word + '"','-o',solf_word + '.aiff'])