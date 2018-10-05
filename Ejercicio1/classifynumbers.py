#!/usr/bin/python

from math import floor,sqrt

#####################################################################################
#   SumDividers function                                                            #
#                                                                                   #
# - Accumulates the value of all dividiers for a number (except the number itself)  #
# - Dividers come as pairs so the limit is the square root of the number            #
# - Assuming large numbers [longs or ints are viable inputs] the square root is     # 
# pre-computed instead of calculating (divisor**2) on each iteration                #
#                                                                                   #
#####################################################################################

'''classify_numbers(number <int|long>)'''

def sum_dividers(number):
    if not(isinstance(number,(int,long))):
        return None
    if number == 0:
        return None
    sum = 1
    checkLimit = long(floor(sqrt(float(number)))+1)
    for div in range(2,checkLimit):
        if number%div == 0:
            sum = sum + div
            if number/div != div:
                sum = sum + number/div
    return sum

#####################################################################################
#   ClasisifyNumbers function                                                       #
#                                                                                   #
# - Receives a list of numbers and prints if they are perfect, defective or abundant#
# - Cache parameters stores the result of calling sum_dividers for efficiency       #
# purposes (on the processing side)                                                 #
#####################################################################################

'''classify_numbers(numberList <list>, cacheEnabled <bool>)'''

def classify_numbers(numberList,memory=False):
    #Protect input
    if not(isinstance(numberList,list)):
        print "Unexpected input type. Expected list of integers"
        return
    #Memory storage
    storedResults = {}
    for number in numberList:
        #Excepcionally accept strings that represent integers
        if isinstance(number,str):
            try: 
                number = int(number)
            except ValueError:
                pass
        if memory and number in storedResults:
            print "%d\t\t %s"%(number,storedResults[number])
        else:
            sumDiv = sum_dividers(number)
            resultStr = ""
            if sumDiv is None:
                print "%s\t\t None"%(number)
                continue
            if sumDiv > number:
                resultStr = "Abundant \t\t(%d > %d)"%(sumDiv,number)
            elif sumDiv < number:
                resultStr = "Defective \t\t(%d < %d)"%(sumDiv,number)
            else:
                resultStr = "Perfect \t\t(%d = %d)"%(sumDiv,number)
            print "%s\t\t %s"%(number,resultStr)
            #Save value for future use
            if memory:
                storedResults[number] = resultStr