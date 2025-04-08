import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  Stack,
  OutlinedInput,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Search as SearchIcon 
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const SongManager = () => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);

  const [formData, setFormData] = useState({
    song_name: '',
    artist_id: '',
    album_id: '',
    genres: [],
    release_date: '',
    audio_url: '',
    image_url: '',
    lyrics: '',
    description: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchSongs();
    fetchArtists();
    fetchAlbums();
    fetchGenres();
  }, []);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/songs');
      if (response.data.success) {
        setSongs(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
      toast.error('Failed to fetch songs');
    } finally {
      setLoading(false);
    }
  };

  const fetchArtists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/artists');
      if (response.data.success) {
        setArtists(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/albums');
      if (response.data.success) {
        setAlbums(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      // This would typically be an API call, but for now we'll use a static list
      setGenres(['Pop', 'Rock', 'Hip-Hop', 'R&B', 'Jazz', 'Electronic', 'Classical', 'Country', 'Folk', 'Reggae']);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setFormData({
      song_name: '',
      artist_id: '',
      album_id: '',
      genres: [],
      release_date: '',
      audio_url: '',
      image_url: '',
      lyrics: '',
      description: ''
    });
    setSelectedGenres([]);
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleEditClick = (song) => {
    setIsEditing(true);
    setFormData({
      _id: song._id,
      song_name: song.song_name,
      artist_id: song.artist_id._id,
      album_id: song.album_id ? song.album_id._id : '',
      genres: song.genres || [],
      release_date: song.release_date ? new Date(song.release_date).toISOString().split('T')[0] : '',
      audio_url: song.audio_url,
      image_url: song.image_url,
      lyrics: song.lyrics || '',
      description: song.description || ''
    });
    setSelectedGenres(song.genres || []);
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleDeleteClick = (song) => {
    setSongToDelete(song);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!songToDelete) return;
    
    try {
      const response = await axios.delete(`http://localhost:5000/api/songs/${songToDelete._id}`);
      if (response.data.success) {
        toast.success('Song deleted successfully');
        fetchSongs();
      } else {
        toast.error('Failed to delete song');
      }
    } catch (error) {
      console.error('Error deleting song:', error);
      toast.error('Error deleting song');
    } finally {
      setDeleteConfirmOpen(false);
      setSongToDelete(null);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleGenreChange = (event) => {
    const { value } = event.target;
    setSelectedGenres(value);
    setFormData({
      ...formData,
      genres: value
    });
    
    // Clear error for genres if it exists
    if (formErrors.genres) {
      setFormErrors({
        ...formErrors,
        genres: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.song_name) errors.song_name = 'Song name is required';
    if (!formData.artist_id) errors.artist_id = 'Artist is required';
    if (!formData.audio_url) errors.audio_url = 'Audio URL is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      let response;
      if (isEditing) {
        // Update existing song
        response = await axios.put(`http://localhost:5000/api/songs/${formData._id}`, formData);
      } else {
        // Create new song
        response = await axios.post('http://localhost:5000/api/songs', formData);
      }
      
      if (response.data.success) {
        toast.success(isEditing ? 'Song updated successfully' : 'Song created successfully');
        setOpenDialog(false);
        fetchSongs();
      } else {
        toast.error(isEditing ? 'Failed to update song' : 'Failed to create song');
      }
    } catch (error) {
      console.error('Error saving song:', error);
      toast.error('Error saving song');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSongs = songs.filter(song => 
    song.song_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (song.artist_id && song.artist_id.artist_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Song Manager
        </Typography>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Search songs"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              sx={{ mr: 2, width: 300 }}
              InputProps={{
                endAdornment: <SearchIcon color="action" />
              }}
            />
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
          >
            Add New Song
          </Button>
        </Box>
        
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Artist</TableCell>
                  <TableCell>Album</TableCell>
                  <TableCell>Genres</TableCell>
                  <TableCell>Views</TableCell>
                  <TableCell>Likes</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : filteredSongs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No songs found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSongs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((song) => (
                      <TableRow hover key={song._id}>
                        <TableCell>
                          {song.image_url ? (
                            <img 
                              src={song.image_url} 
                              alt={song.song_name} 
                              width="50" 
                              height="50" 
                              style={{ objectFit: 'cover', borderRadius: '4px' }}
                            />
                          ) : (
                            <Box 
                              sx={{ 
                                width: 50, 
                                height: 50, 
                                bgcolor: 'grey.300', 
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              No image
                            </Box>
                          )}
                        </TableCell>
                        <TableCell>{song.song_name}</TableCell>
                        <TableCell>
                          {song.artist_id ? song.artist_id.artist_name : 'Unknown Artist'}
                        </TableCell>
                        <TableCell>
                          {song.album_id ? song.album_id.album_name : 'No Album'}
                        </TableCell>
                        <TableCell>
                          {song.genres && song.genres.length > 0 ? (
                            <Stack direction="row" spacing={1}>
                              {song.genres.slice(0, 2).map((genre, index) => (
                                <Chip key={index} label={genre} size="small" />
                              ))}
                              {song.genres.length > 2 && (
                                <Chip label={`+${song.genres.length - 2}`} size="small" variant="outlined" />
                              )}
                            </Stack>
                          ) : (
                            'No genres'
                          )}
                        </TableCell>
                        <TableCell>{song.views || 0}</TableCell>
                        <TableCell>{song.likes || 0}</TableCell>
                        <TableCell align="center">
                          <IconButton 
                            color="primary" 
                            onClick={() => handleEditClick(song)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            color="error" 
                            onClick={() => handleDeleteClick(song)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredSongs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      
      {/* Add/Edit Song Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Song' : 'Add New Song'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                name="song_name"
                label="Song Name"
                fullWidth
                value={formData.song_name}
                onChange={handleInputChange}
                error={!!formErrors.song_name}
                helperText={formErrors.song_name}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!formErrors.artist_id} required>
                <InputLabel id="artist-label">Artist</InputLabel>
                <Select
                  labelId="artist-label"
                  name="artist_id"
                  value={formData.artist_id}
                  onChange={handleInputChange}
                  label="Artist"
                >
                  {artists.map((artist) => (
                    <MenuItem key={artist._id} value={artist._id}>
                      {artist.artist_name}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.artist_id && <FormHelperText>{formErrors.artist_id}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="album-label">Album</InputLabel>
                <Select
                  labelId="album-label"
                  name="album_id"
                  value={formData.album_id}
                  onChange={handleInputChange}
                  label="Album"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {albums.map((album) => (
                    <MenuItem key={album._id} value={album._id}>
                      {album.album_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="genres-label">Genres</InputLabel>
                <Select
                  labelId="genres-label"
                  multiple
                  value={selectedGenres}
                  onChange={handleGenreChange}
                  input={<OutlinedInput label="Genres" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="release_date"
                label="Release Date"
                type="date"
                fullWidth
                value={formData.release_date}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="audio_url"
                label="Audio URL"
                fullWidth
                value={formData.audio_url}
                onChange={handleInputChange}
                error={!!formErrors.audio_url}
                helperText={formErrors.audio_url}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="image_url"
                label="Image URL"
                fullWidth
                value={formData.image_url}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="lyrics"
                label="Lyrics"
                multiline
                rows={4}
                fullWidth
                value={formData.lyrics}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                multiline
                rows={2}
                fullWidth
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the song "{songToDelete?.song_name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SongManager;
