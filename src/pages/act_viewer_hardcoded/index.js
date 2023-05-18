import React from 'react';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, FormControl, InputLabel, Select, MenuItem, Card, CardHeader, Accordion, AccordionSummary, AccordionDetails, Typography, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';

const tags = ['Design', 'Retirement', 'Development', 'Model-Evaluation', 'Operation'];

const articles = [
  {
    tags: ["Design", "Retirement"],
    heading: "Article 6",
    subheading: "Classification rules for high-risk AI systems",
    content: "1. Irrespective of whether an Annex II AI system is placed on the market or put into service independently from the products referred to in points (a) and (b), that AI system shall be considered high-risk where both of the following conditions are fulfilled:\n(a) the AI system is intended to be used as a safety component of a product, or is itself a product, covered by the Union harmonisation legislation listed in Annex II;\n(b) the product whose safety component is the AI system, or the AI system itself as a product, is required to undergo a third-party conformity assessment with a view to the placing on the market or putting into service of that product pursuant to the Union harmonisation legislation listed in Annex II.\n2. In addition to the high-risk AI systems referred to in paragraph 1, AI systems referred to in Annex III shall also be considered high-risk.",
    Simple_words: "Simple words for Article 1"
  },
  {
    tags: ['Design', 'Development', 'Model-Evaluation'],
    heading: "Article 7",
    subheading: "Classification rules for high-risk AI systems",
    content: "1. Irrespective of whether an AI system is placed on the market or put into service independently from the products referred to in points (a) and (b), that AI system shall be considered high-risk where both of the following conditions are fulfilled:\n(a) the AI system is intended to be used as a safety component of a product, or is itself a product, covered by the Union harmonisation legislation listed in Annex II;\n(b) the product whose safety component is the AI system, or the AI system itself as a product, is required to undergo a third-party conformity assessment with a view to the placing on the market or putting into service of that product pursuant to the Union harmonisation legislation listed in Annex II.\n2. In addition to the high-risk AI systems referred to in paragraph 1, AI systems referred to in Annex III shall also be considered high-risk.",
    Simple_words: "Simple words for Article 1"
  },
  {
    tags: ['Model-Evaluation', 'Operation'],
    heading: 'Annex II',
    subheading: 'Classification rules for high-risk AI systems',
    content: '3. Irrespective of whether Annex III an AI system is placed on the market or put into service independently from the products referred to in points (a) and (b), that AI system shall be considered high-risk where both of the following conditions are fulfilled\n2. In addition to the high-risk AI systems referred to in paragraph 1, AI systems referred to in Annex III shall also be considered high-risk.',
    Simple_words: 'Simple words for Article 2',
  },
];

export default function ArticlePage() {
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedSimpleWords, setSelectedSimpleWords] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const selectedArticles = articles.filter((article) => article.tags && article.tags.includes(selectedTag));

  const showArticlesWithTag = (tag) => {
    setSelectedTag(tag);
    setSelectedSimpleWords('');
  };

  const handleOpenDialog = (article) => {
    setSelectedArticle(article);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const replaceAnnexWithDialog = (content, article) => {
    return content.split('Annex II').map((text, index, array) => {
      if (index === array.length - 1) {
        return text;
      }

      return (
        <React.Fragment key={index}>
          {text}
          <Button
            onClick={() => handleOpenDialog(article)}
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            Annex II
          </Button>
        </React.Fragment>
      );
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <FormControl variant="outlined" sx={{ mb: 1 }}>
        <InputLabel id="select-article-label">AI Process</InputLabel>
        <Select
          labelId="select-article-label"
          value={selectedTag}
          onChange={(e) => showArticlesWithTag(e.target.value)}
          label="Select Tag"
        >
          {tags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedArticles && selectedArticles.length > 0 ? (
        <Box sx={{ mt: 2, maxHeight: 'calc(100vh - 240px)', overflowY: 'auto' }}>
          {selectedArticles.map((article, index) => (
            <Card key={index} variant="outlined" sx={{ mb: 2 }}>
              <CardHeader title={article.heading} subheader={article.subheading} />
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`content-${index}`} id={`content-header-${index}`}>
                  <Typography variant="subtitle1">Content</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CardContent>
                    <Typography variant="body1">
                      {replaceAnnexWithDialog(article.content, article)}
                    </Typography>
                  </CardContent>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`simple-words-${index}`} id={`simple-words-header-${index}`}>
                  <Typography variant="subtitle1">Simple Words</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CardContent>
                    <Typography variant="body1">{article.Simple_words}</Typography>
                  </CardContent>
                </AccordionDetails>
              </Accordion>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">No articles found for the selected tag.</Typography>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
          {selectedArticle?.heading}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {selectedArticle?.content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
