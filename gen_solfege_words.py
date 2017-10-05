import sys
import subprocess

print_words = True
if len(sys.argv) > 1:
    print_words = False

# Generate all combinations for simple time signatures that add up to quarter note
solf = ["ta ah ah ah", "ta ah", "sa ah ah ah", "sa ah", "ta", "sa", "tim ka", "ka tim", "sing co pa"]

solf_parts = {
    "tea": 0.5,     # eight note
    "ticka": 0.5,   # two sixteenths
    "teh": 0.25,
    "sea": 0.5,     # eigth rest
    "seh": 0.25      # sixteenth rest
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


for solf_word in solf:
    if print_words:
        print(solf_word)
    else:
        subprocess.check_output(['say','-v','Samantha','"' + solf_word + '"','-o',solf_word.replace(' ','_') + '.aiff'])