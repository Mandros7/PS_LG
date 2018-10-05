#!/usr/bin/python

from classifynumbers import sum_dividers
import unittest

##################################
# Tests for sum_dividers funct   #
##################################

class TestSumDividers(unittest.TestCase):

    def test_zero(self):
        self.assertEqual(sum_dividers(0),None)

    def test_one(self):
        self.assertEqual(sum_dividers(1),1)

    def test_not_integer(self):
        self.assertEqual(sum_dividers("test"),None)
        self.assertEqual(sum_dividers(0.23),None)

    def test_prime(self):
        self.assertEqual(sum_dividers(9227),1)

    def test_number(self):
        self.assertEqual(sum_dividers(6),6)
        self.assertEqual(sum_dividers(8),7)

    def test_exact_root(self):
        self.assertEqual(sum_dividers(25),6)

if __name__ == '__main__':
    unittest.main()
