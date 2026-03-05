# MYED: Theme Dev (safe)
# Prevents Theme Editor settings from being overwritten

$Store = "myedenday-3"
$ThemeId = "194591588690"
$Path = $env:MYED_PREVIEW_PATH
if ([string]::IsNullOrEmpty($Path)) {
    $Path = "/pages/uber-uns"
}

Write-Host "[MYED] Pulling settings_data.json from theme $ThemeId..."
shopify theme pull --store $Store --theme $ThemeId --only config/settings_data.json --path .

Write-Host "[MYED] Pulling templates/*.json from theme $ThemeId..."
try {
    shopify theme pull --store $Store --theme $ThemeId --only templates/*.json --path .
    Write-Host "Pulled settings_data.json + templates json from theme $ThemeId"
} catch {
    Write-Host "[MYED] templates/*.json glob failed, pulling all templates/*.json..."
    $templateFiles = Get-ChildItem -Path "templates" -Filter "*.json" | Select-Object -ExpandProperty Name
    foreach ($file in $templateFiles) {
        shopify theme pull --store $Store --theme $ThemeId --only "templates/$file" --path .
    }
    Write-Host "Pulled settings_data.json + all templates json from theme $ThemeId"
}

Write-Host "Starting theme dev on $Store theme $ThemeId path $Path"
shopify theme dev --store $Store --theme $ThemeId --path $Path
