# PowerShell script to download images for Wanderlust Travels website

# Create directories if they don't exist
$directories = @(
    "images",
    "images/cities",
    "images/tours",
    "images/backgrounds"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
        Write-Host "Created directory: $dir"
    }
}

# Function to download an image
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

# City Images
$cityImages = @{
    "abu-dhabi.jpg" = "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    "dubai.jpg" = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    "jeddah.jpg" = "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    "singapore.jpg" = "https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    "tokyo.jpg" = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    "paris.jpg" = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    "bali.jpg" = "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    "swiss-alps.jpg" = "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
}

# Tour Images
$tourImages = @{
    "dubai-tour.jpg" = "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    "singapore-tour.jpg" = "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    "abu-dhabi-tour.jpg" = "https://images.unsplash.com/photo-1528700850553-7c71be1d1767?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
}

# Background Images
$backgroundImages = @{
    "hero-bg.jpg" = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "newsletter-bg.jpg" = "https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "destinations-hero.jpg" = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    "contact-hero.jpg" = "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
}

# Download city images
foreach ($image in $cityImages.GetEnumerator()) {
    $outputPath = "images/cities/$($image.Key)"
    Download-Image -Url $image.Value -OutputPath $outputPath
}

# Download tour images
foreach ($image in $tourImages.GetEnumerator()) {
    $outputPath = "images/tours/$($image.Key)"
    Download-Image -Url $image.Value -OutputPath $outputPath
}

# Download background images
foreach ($image in $backgroundImages.GetEnumerator()) {
    $outputPath = "images/backgrounds/$($image.Key)"
    Download-Image -Url $image.Value -OutputPath $outputPath
}

Write-Host "All images have been downloaded successfully!" 