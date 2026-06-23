const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            if (!file.includes('node_modules') && !file.includes('dist') && !file.includes('.astro')) {
                results = results.concat(walk(file));
            }
        } else { 
            if (file.endsWith('.astro') || file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('C:\\Users\\user\\Documents\\CODING\\TEMPLATE WEB SEKOLAH\\stitch_modern_institutional_school_blueprint\\src');
let totalFilesModified = 0;
let fileLog = [];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // WAVE 1: Hardcoded Color Bypass Replacement
    content = content.replace(/bg-slate-100/g, 'bg-surface-container-highest');
    content = content.replace(/bg-slate-200/g, 'bg-outline-variant');
    content = content.replace(/border-slate-100/g, 'border-outline-variant');
    content = content.replace(/border-slate-[23]00/g, 'border-outline');
    content = content.replace(/text-slate-500/g, 'text-on-surface-variant');
    content = content.replace(/bg-slate-900\/50/g, 'bg-inverse-surface/50'); 
    
    // Error/Success state normalization (WAVE 1 & 4)
    content = content.replace(/text-red-500/g, 'text-error');
    content = content.replace(/bg-red-100/g, 'bg-error-container');
    content = content.replace(/text-red-700/g, 'text-on-error-container');
    content = content.replace(/bg-green-100/g, 'bg-surface-container-high text-primary'); 
    content = content.replace(/text-green-700/g, 'text-primary');

    // WAVE 2: Unsafe Hover / Interactive States
    content = content.replace(/group-hover:text-secondary-container/g, 'group-hover:text-hover-heading-safe');
    content = content.replace(/group-hover:text-secondary-fixed-dim/g, 'group-hover:text-hover-heading-safe');
    content = content.replace(/hover:text-primary/g, 'hover:text-hover-link-safe');
    content = content.replace(/group-hover:text-primary/g, 'group-hover:text-hover-link-safe');
    content = content.replace(/group-hover:bg-primary\b(?!-)/g, 'group-hover:bg-hover-primary-safe');
    content = content.replace(/group-hover:text-white/g, 'group-hover:text-on-primary');

    // WAVE 3: Alpha Transparency Semantic Cleanup
    content = content.replace(/bg-primary\/5/g, 'bg-soft-primary-bg');
    content = content.replace(/bg-primary\/10/g, 'bg-soft-primary-bg');
    content = content.replace(/border-primary\/10/g, 'border-border-soft');
    content = content.replace(/border-primary\/20/g, 'border-border-soft');
    content = content.replace(/bg-secondary-container\/10/g, 'bg-soft-accent-bg');
    content = content.replace(/text-primary\/10/g, 'text-border-soft');
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        fileLog.push(`- ${file}`);
        totalFilesModified++;
    }
}

console.log('=== Component Rewire Complete ===');
console.log(`Successfully patched ${totalFilesModified} files:`);
console.log(fileLog.join('\n'));

