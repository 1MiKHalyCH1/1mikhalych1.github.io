#!/usr/bin/python3

import os, sys
from shutil import copy2, rmtree
from collections import defaultdict


def generate(dirname):
	with open(os.path.join(dirname, 'tickets.txt')) as f:
		lines = f.readlines()
		tickets = list(map(lambda x:x.strip(), lines))

	d = [x for x in os.listdir(os.path.join(dirname, 'Images')) if x.lower().endswith('.jpg')]
	images = defaultdict(list)
	for x in d:
		images[x.split('.')[0]].append(x)

	for i in images.keys():
		rmtree(str(i), ignore_errors = True)

	for k, v in images.items():
		for file in v:
			new_dir = os.path.join(dirname, k)
			old_path = os.path.join(dirname, 'Images', file)
			new_path = os.path.join(new_dir, file)
			if not os.path.exists(new_dir):
				os.mkdir(new_dir)
			copy2(old_path, new_path)

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
		html_path = os.path.join(dirname, k, 'ticket.html')
		with open(html_path, 'w') as f:
			f.write(s)

	s =  '<html>\n<head>\n\t<title>'
	s += 'Билеты'
	s += '</title>\n'
	s += '\t<meta charset="utf-8">\n'
	s += '</head>\n<body>\n'
	for i in range(len(tickets)):
		s += '\t<a href="./'+ str(i+1) +'/ticket.html">'+tickets[i]+'</a><br>\n'
	s += '</body>\n</html>\n'
	with open(os.path.join(dirname, 'index.html'), 'w') as f:
		f.write(s)

if __name__ == '__main__':
	if len(sys.argv) == 2:
		dirname = sys.argv[1]
		if os.path.isdir(dirname):
			generate(dirname)
		else:
			print("Can't find directory '{}'".format(dirname))
	else:
		print('use it: "./Generator.py <dirname>"')
