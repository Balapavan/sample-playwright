
str1 = 'abcaabc1'
occurence = {}
for char in str1:
    if char in occurence.keys():
        occurence[char] = occurence[char] + 1
    else:
        occurence[char] = 1
print(occurence)

str2 = '4[abc3[fg]5[d]]'#'2[a2[b]3[c]]'
   #ccc
   #bcccbccc
print(str2.count('['))
print(str2.count(']'))
disc1 = {'[': [], ']': [] }

for key in disc1.keys():
    for index in range(len(str2)):
        if str2[index] == key:
            disc1[key].append(index)
print(disc1)
indexpairing = [[disc1['['][0], disc1[']'][len(disc1[']'])-1]]]
print(indexpairing)

for index, value in enumerate(disc1['['][1:]):
    if type(disc1[']'][:-1]) != int:
       break
    targetset= disc1[']'][:-1]
    indexpairing.append([value, targetset[index]])
print(indexpairing)
finalstring = ''
for index in range(len(indexpairing)-1, -1, -1):
    #print(index)
    iterator = str2[indexpairing[index][0] -1]
    multipliersubString = str2[indexpairing[index][0]+1:indexpairing[index][1]]
    print('sub string -->, ', multipliersubString)
    if index == 0:
        multipliersubString = str2[indexpairing[index][0]+1]
        print('0 sub string -->, ', multipliersubString)
        finalstring = int(iterator) * (multipliersubString + finalstring)
    else:    
        finalstring = int(iterator) * multipliersubString + finalstring
    print(index, finalstring)
print(finalstring)

    
