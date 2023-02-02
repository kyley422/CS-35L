#!/usr/bin/python

import random, sys, argparse

def main():
    version_msg = "%prog 2.0"
    usage_msg = """%prog [OPTION]... FILE

    Output randomly selected lines from FILE."""

    parser = argparse.ArgumentParser(description="""Write a random permutation of the input lines to standard output.

With no filename, or when filename is -, read standard input.""")
    parser.add_argument('filename',nargs='*',help="File to be used as input.")
    parser.add_argument('-e','--echo',help="Treat each command-line operand as an input line.",action="store_true")
    parser.add_argument('-i','--input-range',help="(-i LO-HI) Act as if input came from a file containing the range of unsigned decimal integers lo...hi, one per line.")
    parser.add_argument('-n','--head-count',help="Output at most count lines. By default, all input lines are output.")
    parser.add_argument('-r','--repeat',help="Repeat output values, that is, select with replacement. With this option the output is not a permutation of the input; instead, each output line is randomly chosen from all the inputs. This option is typically combined with --head-count; if --head-count is not given, shuf repeats indefinitely.",action="store_true")
    args, unknown = parser.parse_known_args()

    lines = []

    if args.echo:
        lines = args.filename
        # if -e is specified with a filename
        if args.filename:
            for i in unknown:
                lines.append(i)
        random.shuffle(lines)
        numLines = len(lines)    
        # -n argument
        if args.head_count:
            numLines = int(args.head_count)
        # -r argument
        if args.repeat:
            # -r with no -n
            if not args.head_count:
                while True:
                    try:
                        print(random.choice(lines))
                    except:
                        print("shuf: error: cannot choose from empty input")
                        return
            # -r with -n
            else:
                try:
                    for i in range(0,int(args.head_count)):
                        print(random.choice(lines))
                except:
                    print("shuf: error: cannot choose from empty input")
                return
        for i in range(0,min(len(lines),numLines)):
            print(f'{lines[i]}')
        return
    if args.input_range:
        # Test for valid input
        try:
            range_split = args.input_range.split('-')
            lower = int(range_split[0])
            upper = int(range_split[1])
        except:
            print(f'shuf.py: error: invalid input range: {args.input_range}')
            return
        if (lower > upper):
            print(f'shuf.py: error: invalid input range: {args.input_range}')
            return

        # Valid input beyond this point        
        nums = list(range(lower,upper+1))
        random.shuffle(nums)
        max_printed = len(nums)
        # -n argument
        if args.head_count:
            max_printed = int(args.head_count)
        # -r argument
        if args.repeat:
            # -r without -n
            if not args.head_count:
                while True:
                    print(random.choice(nums))
            # -r with -n
            else:
                for i in range(0, int(args.head_count)):
                    print(random.choice(nums))
                return
        for i in range(0,min(len(nums),max_printed)):
            print(f'{nums[i]}')
        return
        
    if not args.filename or args.filename[0] == '-':
        for line in sys.stdin:
            lines.append(line.rstrip())
        random.shuffle(lines)
        max_printed = len(lines)
        # -n argument
        if args.head_count:
            max_printed = int(args.head_count)
        # -r argument
        if args.repeat:
            # -r without -n
            if not args.head_count:
                while True:
                    print(random.choice(lines))
            # -r with -n
            else:
                for i in range(0, int(args.head_count)):
                    print(random.choice(lines))
                return
        for i in range(0,min(len(lines),max_printed)):
            print(f'{lines[i]}')
        return

    elif args.filename:
        try:
            f = open(args.filename[0], "r")
        except:
            print(f'shuf.py: error: no such file or directory: {args.filename[0]}')
            return
        lines = f.read().splitlines()
        random.shuffle(lines)
        max_printed = len(lines)
        # -n argument
        if args.head_count:
            max_printed = int(args.head_count)
        # -r argument
        if args.repeat:
            # -r without -n
            if not args.head_count:
                while True:
                    print(random.choice(lines))
            # -r with -n
            else:
                for i in range(0, int(args.head_count)):
                    print(random.choice(lines))
                return
        for i in range(0,min(len(lines),max_printed)):
            print(f'{lines[i]}')
        f.close()
        return
if __name__ == "__main__":
    main()
