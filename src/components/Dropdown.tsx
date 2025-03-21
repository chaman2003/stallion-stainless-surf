import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  title: string;
  items: Array<{id: string | number; label: string}>;
  onItemClick?: (id: string | number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ 
  title = "Products", 
  items = [], 
  onItemClick 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    // Handle dropdown opening
    const handleMouseEnter = () => {
        setIsOpen(true);
    };
    
    // Handle dropdown closing
    const handleMouseLeave = () => {
        setIsOpen(false);
    };
    
    // Handle item click
    const handleItemClick = (id: string | number) => {
        if (onItemClick) {
            onItemClick(id);
        }
        setIsOpen(false);
    };
    
    // Extra safety to close dropdown when clicking outside
    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleDocumentClick);
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, []);
    
    return (
        <div 
            ref={dropdownRef}
            className="dropdown-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            <button 
                className="dropdown-trigger"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {title}
            </button>
            
            {isOpen && (
                <div 
                    className="dropdown-menu"
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 1000,
                        minWidth: '200px',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        border: '1px solid #eee',
                        borderRadius: '4px',
                        padding: '8px 0',
                    }}
                >
                    {items.length > 0 ? (
                        items.map(item => (
                            <div
                                key={item.id}
                                className="dropdown-item"
                                onClick={() => handleItemClick(item.id)}
                                style={{
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                {item.label}
                            </div>
                        ))
                    ) : (
                        <div className="dropdown-item" style={{ padding: '8px 16px' }}>
                            No items available
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dropdown; 