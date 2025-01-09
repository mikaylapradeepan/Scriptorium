import React, { useState } from 'react';
import SearchBar from '@/components/TemplateSearchBar';
import { useRouter } from "next/router";

interface Template {
  id: number,
  title: string;
  explanation: string;
  tags: string;
  code: string;
}

const TemplatePage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [results, setResults] = useState<Template[]>([]); 
  const router = useRouter();

  const handleSearch = async ({ title, explanation, tags, code}: { title?: string; explanation?: string; tags?: string; code?: string }) => {
    try {
      const query = new URLSearchParams();
      if (title) query.append("title", title);
      if (explanation) query.append("explanation", explanation);
      if (tags) query.append("tags", tags);
      if (code) query.append("code", code);

      const response = await fetch(`/api/templates?${query.toString()}`);

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.log(data.error);
        setErrorMessage("Failed to fetch results.");
        return;
      }
      setResults(data);
      
    } catch (error) {
      console.error("Error fetching search results:", error);
      setErrorMessage("Error fetching templates.")
    }
  };

  const handleTemplateClick = (id: number) => {
    router.push(`/templates/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-6 text-black">Search for Templates</h2>
      {/* Search Bar */}
      <div className="w-full max-w-md">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Results or Post Details */}
      <div className='mt-8 w-full max-w-3xl'>
        <ul className="mt-4 space-y-4">
          {results.map((template) => (
            <li
              key={template.id}
              className="p-6 bg-white rounded shadow cursor-pointer"
              onClick={() => handleTemplateClick(template.id)}
            >
              <h2 className="block hover:underline text-lg font-bold text-blue-500 mb-1">
                {template.title}
              </h2>
              <p className='text-grey'>{template.explanation}</p>
            </li>
          ))}
        </ul>
      </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default TemplatePage;