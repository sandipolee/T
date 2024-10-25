export{ auth as middleware} from "@/auth";


export const config = {
  matcher: ['/api/:path*'],
  runtime: 'nodejs' // This will use Node.js runtime instead of Edge
};

