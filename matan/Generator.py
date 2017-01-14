#!/usr/bin/python3

import os
from shutil import copy2, rmtree
from collections import defaultdict

with open('tickets.txt') as f:
	tickets = list(map(lambda x:x.strip(),f.readlines()))

d = [x for x in os.listdir('./Images') if x.endswith('.jpg')]
images = defaultdict(list)
for x in d:
	images[x.split('.')[0]].append(x)

for i in images.keys():
	rmtree(str(i), ignore_errors = True)
# print('\n'.join(map(str,sorted(images.items()))))
for k, v in images.items():
	if not os.path.exists(k):
		os.mkdir(k)
	for file in v:
		copy2('./Images/' + file, './' + k + '/' + file)

for k, v in images.items():
	html_name = './' + str(k) + '/ticket.html'
	s =  '<html>\n<head>\n\t<title>'
	s += tickets[int(k) - 1]
	s += '</title>\n'
	s += '\t<meta charset="utf-8">\n'
	s += '</head>\n<body>\n'
	for item in sorted(v,key=lambda x:int(x.split('.')[1])):
		s += '\t<img src="./' + item + '" width="100%">\n'
	s += '</body>\n</html>\n'
	with open('./' + k + '/ticket.html', 'w') as f:
		f.write(s)	

s =  '<html>\n<head>\n\t<title>'
s += 'Билеты'
s += '</title>\n'
s += '\t<meta charset="utf-8">\n'
s += '</head>\n<body>\n'
for i in range(len(tickets)):
	s += '\t<a href="./'+ str(i+1) +'/ticket.html">'+tickets[i]+'</a><br>\n'
s += '</body>\n</html>\n'
with open('./index.html', 'w') as f:
	f.write(s)