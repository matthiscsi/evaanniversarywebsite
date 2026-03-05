$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$photoDir = Join-Path $projectRoot "photos"
$outFile = Join-Path $projectRoot "photo-list.js"
$exts = @(".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".bmp")

$files = Get-ChildItem -File $photoDir |
  Where-Object { $exts -contains $_.Extension.ToLower() } |
  Select-Object -ExpandProperty Name

$lines = @("// Auto-generated from /photos image files.", "window.PHOTO_FILES = [")
foreach ($f in $files) {
  $safe = $f.Replace("\", "\\").Replace('"', '\"')
  $lines += ('  "' + $safe + '",')
}
$lines += "];"

Set-Content -Path $outFile -Value $lines -Encoding UTF8
Write-Host ("Updated photo-list.js with " + $files.Count + " image(s).")
