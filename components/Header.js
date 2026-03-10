import Link from 'next/link';

export default function Header({ name, categories }) {
  return (
    <header className="pt-20 pb-12">
      <div className="block w-12 h-12 mx-auto mb-4 rounded-full bg-conic-180 from-gradient-3 from-0% to-gradient-4 to-100%" />
      <p className="text-2xl text-center dark:text-white">
        <Link href="/">{name}</Link>
      </p>
      {/* Category Navigation Links */}
      <nav className="mt-6">
        <ul className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-white/60">
          <li>
            <Link href="/" className="hover:text-purple-500 transition-colors">
              Home
            </Link>
          </li>
          {/* Mapping through the categories passed from your pages */}
          {categories.map((cat) => (
            <li key={cat}>
              <Link 
                href={`/category/${cat.toLowerCase()}`}
                className="hover:text-purple-500 transition-colors"
              >
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
