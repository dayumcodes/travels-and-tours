# Download the missing Abu Dhabi tour image

function Download-Image {
    param (
        [string]$Url,
        [string]$OutputPath
    )
    
    try {
        Invoke-WebRequest -Uri $Url -OutFile $OutputPath
        Write-Host "Downloaded: $OutputPath"
    }
    catch {
        Write-Host "Failed to download: $Url"
        Write-Host $_.Exception.Message
    }
}

# Alternative Abu Dhabi tour image
$abuDhabiTourUrl = "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
$outputPath = "images/tours/abu-dhabi-tour.jpg"

Download-Image -Url $abuDhabiTourUrl -OutputPath $outputPath 