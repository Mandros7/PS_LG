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

