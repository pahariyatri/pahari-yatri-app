import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // ?title=<title>
        const hasTitle = searchParams.has('title');
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100)
            : 'My default title';

        const hasSubtitle = searchParams.has('subtitle');
        const subtitle = hasSubtitle
            ? searchParams.get('subtitle')?.slice(0, 200)
            : 'My default title';

        return new ImageResponse(
            (
                <div
                    style={{
                        backgroundColor: 'white',
                        backgroundSize: '150px 150px',
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        flexWrap: 'nowrap',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            justifyItems: 'center',
                        }}
                    >
                        <img
                            alt="Vercel"
                            height={200}
                            src="https://i.pinimg.com/736x/63/27/9d/63279d93bdd63862256bb4c7e500e10b.jpg"
                            style={{ margin: '0 30px' }}
                            width={200}
                        />
                    </div>
                    <div
                        style={{
                            fontSize: 60,
                            fontStyle: 'normal',
                            letterSpacing: '-0.025em',
                            color: 'black',
                            marginTop: 30,
                            padding: '0 120px',
                            lineHeight: 1.4,
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {title}
                    </div>
                    <div tw="bg-gray-50 flex">
                        <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
                            <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                                <span>{title}</span>
                                <span tw="text-indigo-600">Start your free trial today.</span>
                            </h2>
                            <div tw="mt-8 flex md:mt-0">
                                <div tw="flex rounded-md shadow">
                                    <a
                                        href="#"
                                        tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white"
                                    >
                                        Get started
                                    </a>
                                </div>
                                <div tw="ml-3 flex rounded-md shadow">
                                    <a
                                        href="#"
                                        tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600"
                                    >
                                        Learn more
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}