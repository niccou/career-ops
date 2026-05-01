#!/usr/bin/env bash
# Claude Code statusLine — devcontainer-style prompt
# @user ➜  cwd (branch ✗)

input=$(cat)

green='\033[0;32m'
lightblue='\033[1;34m'
cyan='\033[0;36m'
red='\033[0;31m'
reset='\033[0m'

user="$(whoami)"
userpart="${green}@${user}${reset}"
arrow="➜"

raw_cwd="$(echo "$input" | jq -r '.cwd // empty')"
[ -z "$raw_cwd" ] && raw_cwd="$(pwd)"

home_dir="$HOME"
display_cwd="${raw_cwd/#$home_dir/\~}"

IFS='/' read -ra parts <<< "$display_cwd"
num_parts=${#parts[@]}
if [ "$num_parts" -gt 4 ]; then
  trimmed_parts=("${parts[@]: -4}")
  display_cwd="…/$(IFS='/'; echo "${trimmed_parts[*]}")"
fi

gitbranch=""
if git -C "$raw_cwd" rev-parse --git-dir >/dev/null 2>&1; then
  branch="$(git -C "$raw_cwd" symbolic-ref --short HEAD 2>/dev/null \
            || git -C "$raw_cwd" rev-parse --short HEAD 2>/dev/null)"
  if [ -n "$branch" ]; then
    if git -C "$raw_cwd" --no-optional-locks status --porcelain 2>/dev/null | grep -q .; then
      gitbranch=" ${cyan}(${branch} ${red}✗${cyan})${reset}"
    else
      gitbranch=" ${cyan}(${branch})${reset}"
    fi
  fi
fi

printf "${userpart} ${arrow}  ${lightblue}%s${reset}%s" "$display_cwd" "$gitbranch"
