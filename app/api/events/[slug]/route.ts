import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Event } from '@/database';

// TypeScript interface for route params
interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Await params as per Next.js 15 requirements
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid slug parameter' 
        },
        { status: 400 }
      );
    }

    // Sanitize slug (alphanumeric and hyphens only)
    const sanitizedSlug = slug.trim().toLowerCase();
    if (!/^[a-z0-9-]+$/.test(sanitizedSlug)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Slug must contain only lowercase letters, numbers, and hyphens' 
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Query event by slug
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Event not found' 
        },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        data: event,
      },
      { status: 200 }
    );

  } catch (error) {
    // Log error for debugging (use proper logging in production)
    console.error('Error fetching event:', error);

    // Handle mongoose/database errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch event',
          message: process.env.NODE_ENV === 'development' ? error.message : undefined,
        },
        { status: 500 }
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
