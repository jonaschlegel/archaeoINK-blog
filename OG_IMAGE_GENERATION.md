# Automatic Open Graph Image Generation

## Overview
The archaeoINK blog now features automatic Open Graph (OG) image generation using Next.js's built-in `ImageResponse` API. This creates beautiful, consistent social media preview images for all pages and blog posts.

## How It Works

### 1. API Route (`/app/api/og/route.tsx`)
The main OG image generator accepts several URL parameters:
- `title`: The page/post title
- `description`: The page/post description
- `type`: The content type (blog, literature, projects, home, page)
- `tags`: Comma-separated list of tags (for blog posts)
- `author`: Author name (if different from site owner)

### 2. Utility Functions (`/lib/og-image.ts`)
Helper functions to generate proper OG image URLs:
- `generateOGImageURL()`: Main function for generating URLs
- `generateBlogOGImage()`: Convenience function for blog posts
- `generatePageOGImage()`: Convenience function for pages

### 3. Automatic Integration
The system automatically generates OG images in several places:

#### Blog Posts
- If a post has custom images, they are used
- If no custom images exist, an automatic OG image is generated with:
  - Post title
  - Post summary
  - Post tags (up to 4)
  - Blog-specific styling

#### Pages
- All pages (About, Projects, Literature, etc.) automatically get OG images
- The system detects the page type and applies appropriate styling

#### Homepage
- Uses the "home" template with site title and description

## Visual Design

### Color Schemes
Different content types have unique color schemes:

- **Blog**: Purple gradient (`#667eea` to `#764ba2`)
- **Literature**: Pink gradient (`#f093fb` to `#f5576c`) 
- **Projects**: Blue gradient (`#4facfe` to `#00f2fe`)
- **Home**: Sunset gradient (`#fa709a` to `#fee140`)

### Layout Features
- **Header**: archaeoINK branding with content type badge
- **Title**: Large, responsive typography
- **Description**: Truncated if too long
- **Tags**: Up to 4 tags displayed as pills (blog posts only)
- **Footer**: Site URL and author info
- **Styling**: Rounded corners, shadows, professional appearance

## Usage Examples

### Manual URL Generation
```typescript
// For blog posts
const blogOG = generateBlogOGImage(
  "Archaeological Illustration Techniques",
  "Learn modern methods for documenting artifacts",
  ["archaeology", "illustration", "documentation"]
)

// For pages
const pageOG = generatePageOGImage(
  "Literature Resources",
  "Comprehensive collection of archaeological illustration literature",
  "literature"
)
```

### Automatic URLs
The system generates URLs like:
```
https://archaeoink.com/api/og?title=Post%20Title&description=Post%20description&type=blog&tags=tag1,tag2
```

## Benefits

### SEO Improvements
- Consistent, professional social media previews
- Improved click-through rates from social platforms
- Better brand recognition

### Development Benefits
- No need to manually create OG images for each post/page
- Consistent design across all content
- Automatic updates when content changes

### Performance
- Images generated on-demand using Edge Runtime
- Fast generation times
- Cached by CDN/browser

## Social Media Compatibility
The generated images follow standard OG image specifications:
- **Size**: 1200x630 pixels
- **Format**: PNG
- **Aspect Ratio**: 1.91:1 (optimal for Facebook, Twitter, LinkedIn)
- **File Size**: Optimized for fast loading

## Customization
To modify the design:
1. Edit `/app/api/og/route.tsx` for visual changes
2. Update `/lib/og-image.ts` for new utility functions
3. Modify color schemes in the `colorSchemes` object

## Testing
Visit these URLs to see the generated images:
- Homepage: `https://archaeoink.com/api/og?type=home`
- Blog post: `https://archaeoink.com/api/og?title=Sample%20Post&type=blog&tags=archaeology`
- Literature: `https://archaeoink.com/api/og?title=Resources&type=literature`

The automatic OG image generation ensures every page and post has a beautiful, consistent social media presence without manual intervention.
