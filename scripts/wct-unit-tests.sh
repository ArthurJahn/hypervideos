#!/bin/bash

# SCRIPT TO RUN WEB COMPONENTS TESTER
# dependencies are placed in a different
# directory than it should be. In order
# to correctly run the unit tests, run this
# script

BASEDIR=$(dirname $0)

cd $BASEDIR/../public/components

ln -s ../bower_components/web-component-tester web-component-tester
ln -s ../bower_components/webcomponentsjs webcomponentsjs

# run web components tester
wct

rm webcomponentsjs
rm web-component-tester
