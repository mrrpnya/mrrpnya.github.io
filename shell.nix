{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    nativeBuildInputs = [
      pkgs.git
      pkgs.deno
      (pkgs.python3.withPackages (python-pkgs: [
        python-pkgs.python-frontmatter
      ]))
    ];
}
  