// components/DialogueList.jsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function DialogueList({ dialogues, onDelete }) {
  const router = useRouter();

  if (dialogues.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 4 }}>
        Aucun dialogue disponible.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
        gap: 3,
      }}
    >
      {dialogues.map((dialogue, index) => (
        <Card key={index} variant="outlined" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <CardContent sx={{ flexGrow: 1, overflow: 'auto' }}>
            <Typography variant="h6" component="div" color="primary" gutterBottom>
              {dialogue.pageType}
            </Typography>
            <Box
              component="pre"
              sx={{
                bgcolor: '#f5f5f5',
                p: 2,
                borderRadius: 1,
                fontFamily: 'Monospace',
                fontSize: '0.875rem',
                maxHeight: 280,
                overflowY: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)',
              }}
            >
              {JSON.stringify(dialogue.dialogue, null, 2)}
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => router.push(`/editdialogue?pageType=${dialogue.pageType}`)}
            >
              Modifier
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => onDelete(dialogue.pageType)}
            >
              Supprimer
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
