#!/bin/sh

ant clean && ( cd .. ; rm -f oi.zip ; zip -r oi.zip oi --exclude '*/.git/*' )
