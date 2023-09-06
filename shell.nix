{ pkgs ? import <nixpkgs> { } }:

with pkgs;

mkShell { buildInputs = [ ruby typescript emscripten ]; } 

