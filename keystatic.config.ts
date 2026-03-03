import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: (process.env.NODE_ENV === 'production' && process.env.KEYSTATIC_GITHUB_CLIENT_ID)
        ? {
            kind: 'github',
            repo: 'rotaractrvceblog10-sudo/Blog',
        }
        : {
            kind: 'local',
        },
    collections: {
        posts: collection({
            label: 'Blog',
            slugField: 'title',
            path: 'src/content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                coverImage: fields.image({
                    label: 'Cover Image',
                    directory: 'public/images/posts',
                    publicPath: '/images/posts',
                }),
                excerpt: fields.text({ label: 'Excerpt', multiline: true }),
                date: fields.date({ label: 'Date' }),
                category: fields.select({
                    label: 'Category',
                    options: [
                        { label: 'Articles', value: 'Articles' },
                        { label: 'Poems', value: 'Poems' },
                        { label: 'Reviews', value: 'Reviews' },
                        { label: 'Events', value: 'Events' },
                    ],
                    defaultValue: 'Articles'
                }),
                author: fields.text({ label: 'Author' }),
                content: fields.document({
                    label: 'Content',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: {
                        directory: 'public/images/posts',
                        publicPath: '/images/posts',
                    },
                }),
            },
        }),
        events: collection({
            label: 'Events',
            slugField: 'title',
            path: 'src/content/events/*',
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                date: fields.date({ label: 'Date' }),
                time: fields.text({ label: 'Time' }),
                location: fields.text({ label: 'Location' }),
                description: fields.text({ label: 'Description', multiline: true }),
                status: fields.select({
                    label: 'Status',
                    options: [
                        { label: 'Upcoming', value: 'Upcoming' },
                        { label: 'Completed', value: 'Completed' },
                    ],
                    defaultValue: 'Upcoming'
                }),
            }
        }),
        team: collection({
            label: 'Team',
            slugField: 'name',
            path: 'src/content/team/*',
            schema: {
                name: fields.slug({ name: { label: 'Name' } }),
                role: fields.text({ label: 'Role' }),
                image: fields.image({
                    label: 'Photo',
                    directory: 'public/images/team',
                    publicPath: '/images/team',
                }),
                bio: fields.text({ label: 'Bio', multiline: true }),
                linkedin: fields.text({ label: 'LinkedIn URL' }),
                instagram: fields.text({ label: 'Instagram URL' }),
                department: fields.select({
                    label: 'Department',
                    options: [
                        { label: 'Literary', value: 'Literary' },
                        { label: 'PR & Web', value: 'PR & Web' },
                        { label: 'Community Service', value: 'Community Service' },
                        { label: 'Professional Development', value: 'Professional Development' },
                        { label: 'International Service', value: 'International Service' },
                        { label: 'Club Service', value: 'Club Service' },
                    ],
                    defaultValue: 'Literary'
                }),
                alignment: fields.select({
                    label: 'Image Alignment',
                    description: 'Focus point of the image',
                    options: [
                        { label: 'Left', value: 'left' },
                        { label: 'Center', value: 'center' },
                        { label: 'Right', value: 'right' },
                        { label: 'Top', value: 'top' },
                        { label: 'Bottom', value: 'bottom' },
                    ],
                    defaultValue: 'center'
                }),
                order: fields.integer({
                    label: 'Display Order',
                    description: 'Lower numbers appear first (e.g. 1 for Director). Default is 99.',
                    defaultValue: 99,
                }),
            }
        }),
        gallery: collection({
            label: 'Gallery',
            slugField: 'title',
            path: 'src/content/gallery/*',
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                image: fields.image({
                    label: 'Image',
                    directory: 'public/images/gallery',
                    publicPath: '/images/gallery',
                }),
                date: fields.date({ label: 'Date' }),
                event: fields.text({ label: 'Event Name' }),
            }
        })
    },
});
