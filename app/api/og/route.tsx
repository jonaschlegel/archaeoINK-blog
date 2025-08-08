import siteMetadata from '@/data/siteMetadata'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || siteMetadata.title
  const description = searchParams.get('description') || siteMetadata.description
  const type = searchParams.get('type') || 'blog'
  const tags = searchParams.get('tags') || ''
  const author = searchParams.get('author') || siteMetadata.author

  const colorSchemes = {
    blog: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      accent: '#667eea',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
    },
    literature: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      accent: '#f093fb',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
    },
    projects: {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      accent: '#4facfe',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
    },
    home: {
      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      accent: '#fa709a',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
    },
  }

  const colors = colorSchemes[type as keyof typeof colorSchemes] || colorSchemes.blog

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: colors.background,
          padding: '60px',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '50px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            width: '100%',
            border: `4px solid ${colors.accent}`,
          }}
        >
          {/* Header with archaeoINK branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px',
              width: '100%',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: colors.accent,
                marginRight: 'auto',
              }}
            >
              archaeoINK
            </div>
            {type !== 'home' && (
              <div
                style={{
                  fontSize: '20px',
                  color: colors.textSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  backgroundColor: `${colors.accent}20`,
                  padding: '8px 16px',
                  borderRadius: '8px',
                }}
              >
                {type}
              </div>
            )}
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: title.length > 50 ? '40px' : '52px',
              fontWeight: 'bold',
              color: colors.textPrimary,
              marginBottom: '20px',
              lineHeight: 1.1,
              letterSpacing: '-1px',
            }}
          >
            {title}
          </div>

          {/* Description */}
          {description && description !== siteMetadata.description && (
            <div
              style={{
                fontSize: '24px',
                color: colors.textSecondary,
                marginBottom: '30px',
                lineHeight: 1.3,
                maxHeight: '100px',
                overflow: 'hidden',
              }}
            >
              {description.length > 120 ? `${description.substring(0, 120)}...` : description}
            </div>
          )}

          {/* Tags */}
          {tags && tags !== '' && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '30px',
              }}
            >
              { }
              {(tags as any)
                .split(',')
                .slice(0, 4)
                .map((tag: string, index: number) => (
                  <div
                    key={index}
                    style={{
                      fontSize: '16px',
                      color: colors.accent,
                      backgroundColor: `${colors.accent}15`,
                      padding: '6px 12px',
                      borderRadius: '20px',
                      border: `1px solid ${colors.accent}40`,
                    }}
                  >
                    { }#
                    {(tag as any).trim()}
                  </div>
                ))}
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 'auto',
              paddingTop: '20px',
              borderTop: `2px solid ${colors.accent}20`,
            }}
          >
            <div
              style={{
                fontSize: '18px',
                color: colors.textSecondary,
              }}
            >
              {siteMetadata.siteUrl?.replace('https://', '')}
            </div>
            {author !== siteMetadata.author && (
              <div
                style={{
                  fontSize: '18px',
                  color: colors.textSecondary,
                }}
              >
                by {author}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
