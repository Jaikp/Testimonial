"use client"
import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { useCopyToClipboard } from "usehooks-ts";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
 
export const ClipboardCopyButton = ({ spaceId, theme = "default", customTheme }: { spaceId: string, theme?: string, customTheme?: any }) => {
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  
  let themeParam = theme !== 'default' ? `?theme=${theme}` : '';
  if (theme === 'custom' && customTheme) {
      themeParam = `?theme=custom&customTheme=${encodeURIComponent(JSON.stringify(customTheme))}`;
  }

  const iframeCode = `<iframe src="${process.env.NEXT_PUBLIC_URL}/embeds/${spaceId}${themeParam}" width="100%" height="800" title="testimonial" style="border:none;"></iframe>`;

  const handleCopy = () => {
    copy(iframeCode);
    setCopied(true);
  };

  return (
    <Button
      onMouseLeave={() => setCopied(false)}
      onClick={handleCopy}
      className="flex items-center gap-x-3 px-4 py-2.5 lowercase"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
      <Typography
        className="border-r border-gray-400/50 pr-3 font-normal"
        variant="small" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        {iframeCode.length > 50 ? iframeCode.substring(0, 47) + "..." : iframeCode}
      </Typography>
      {copied ? (
        <CheckIcon className="h-4 w-4 text-white" />
      ) : (
        <DocumentDuplicateIcon className="h-4 w-4 text-white" />
      )}
    </Button>
  );
}