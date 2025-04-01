import React, { useState, memo, useCallback } from "react";
import { X, Image as ImageIcon, Loader, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useGallery, GALLERY_CATEGORIES, GALLERY_TAGS } from "@/contexts/GalleryContext";
import NextImage  from "next/image";

export const GalleryUploadModal = memo(() => {
  const { 
    isUploadModalOpen, 
    toggleUploadModal,
    uploadImageLink,
    setUploadImageLink,
    validateImageLink,
    isValidImageLink,
    isLinkLoading,
    submitUploadForm
  } = useGallery();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "builds",
    tags: [] as string[]
  });

  const [isFormValid, setIsFormValid] = useState(false);
  
  // Check form validity when relevant fields change
  React.useEffect(() => {
    setIsFormValid(isValidImageLink && formData.title.trim().length > 0);
  }, [isValidImageLink, formData.title]);
  
  // Memoized handlers for better performance
  const toggleTag = useCallback((tag: string) => {
    setFormData(prevData => {
      if (prevData.tags.includes(tag)) {
        return {
          ...prevData,
          tags: prevData.tags.filter(t => t !== tag)
        };
      } else {
        return {
          ...prevData,
          tags: [...prevData.tags, tag]
        };
      }
    });
  }, []);
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    submitUploadForm({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags
    });
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "builds",
      tags: []
    });
  }, [formData, isFormValid, submitUploadForm]);
  
  if (!isUploadModalOpen) return null;
  
  return (
    <AnimatePresence>
      {isUploadModalOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 upload-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              toggleUploadModal();
            }
          }}
        >
          <motion.div 
            className="bg-background rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto upload-modal-content"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Upload Image</h2>
              <button 
                className="p-1 rounded-full hover:bg-muted transition-colors"
                onClick={toggleUploadModal}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              {/* Left Column - Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Image URL <span className="text-destructive">*</span>
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={uploadImageLink}
                      onChange={(e) => setUploadImageLink(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-grow"
                      name="imageUrl"
                      required
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={validateImageLink}
                      disabled={!uploadImageLink || isLinkLoading}
                      className="transition-all duration-300"
                    >
                      {isLinkLoading ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : isValidImageLink ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        "Validate"
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter a direct link to an image file (JPG, PNG, GIF)
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Title <span className="text-destructive">*</span>
                  </label>
                  <Input
                    value={formData.title}
                    onChange={handleInputChange}
                    name="title"
                    placeholder="Give your image a title"
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={handleInputChange}
                    name="description"
                    placeholder="Describe your image (optional)"
                    className="w-full min-h-24 px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={handleInputChange}
                    name="category"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    {GALLERY_CATEGORIES.filter(c => c.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 border border-border rounded-md p-2">
                    {GALLERY_TAGS.map(tag => (
                      <Badge
                        key={tag}
                        variant={formData.tags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer transition-colors duration-200"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="space-y-4">
                <div className="text-sm font-medium mb-1.5">Preview</div>
                <AnimatePresence mode="wait">
                  {isValidImageLink && uploadImageLink ? (
                    <motion.div 
                      key="preview-image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative rounded-lg overflow-hidden border border-border bg-muted/30 h-[350px] flex items-center justify-center"
                    >
                      <NextImage 
                        src={uploadImageLink} 
                        alt="Preview" 
                        className="max-w-full max-h-full object-contain"
                        width={500}
                        height={500}
                      />
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="preview-placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-8 h-[350px]"
                    >
                      <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-center mb-2">
                        {isLinkLoading 
                          ? "Validating image..." 
                          : "Enter a valid image URL and click \"Validate\""}
                      </p>
                      <p className="text-xs text-muted-foreground text-center">
                        The image will be previewed here after validation
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="border-t pt-4 mt-auto">
                  <AnimatePresence>
                    {formData.title && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-2"
                      >
                        <h3 className="font-bold">{formData.title}</h3>
                        {formData.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {formData.description}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {formData.category && (
                    <div className="mb-2">
                      <Badge variant="secondary">
                        {GALLERY_CATEGORIES.find(c => c.id === formData.category)?.label || formData.category}
                      </Badge>
                    </div>
                  )}

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {formData.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={toggleUploadModal}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={!isFormValid}
                    className={`transition-all duration-300 ${isFormValid ? 'bg-primary hover:bg-primary/90' : 'bg-primary/50'}`}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

GalleryUploadModal.displayName = "GalleryUploadModal";
