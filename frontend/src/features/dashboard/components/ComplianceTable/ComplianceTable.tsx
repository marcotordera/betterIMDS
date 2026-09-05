import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Paper,
  Checkbox,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  toggleSelectAirman,
  selectAllAirmen,
  openCellModal,
  openAirmanProfileModal,
  setSorting,
  selectFilteredRoster,
  selectSelectedAirmanIds,
  selectSelectedSquadron,
  selectSortField,
  selectSortOrder,
} from '../../dashboardSlice';
import { COURSES } from '../../mockData';
import StatusBadge from './StatusBadge';
import LogCompletionModal from './LogCompletionModal';
import AirmanProfileModal from './AirmanProfileModal';

export default function ComplianceTable() {
  const dispatch = useAppDispatch();
  const selectedSquadron = useAppSelector(selectSelectedSquadron);
  const filteredRoster = useAppSelector(selectFilteredRoster);
  const selectedAirmanIds = useAppSelector(selectSelectedAirmanIds);
  const sortField = useAppSelector(selectSortField);
  const sortOrder = useAppSelector(selectSortOrder);

  const allAirmanIds = filteredRoster.map((r) => r.airman.uid);
  const allSelected = allAirmanIds.length > 0 && allAirmanIds.every((id) => selectedAirmanIds.includes(id));
  const isIndeterminate = selectedAirmanIds.length > 0 && !allSelected;

  const handleRequestSort = (field: string) => {
    dispatch(setSorting(field));
  };

  return (
    <>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          borderRadius: 2,
          overflowX: 'auto',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <Table sx={{ minWidth: 950 }} size="small">
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={isIndeterminate}
                  checked={allSelected}
                  onChange={(e) => dispatch(selectAllAirmen(e.target.checked ? allAirmanIds : []))}
                  inputProps={{ 'aria-label': 'select all airmen' }}
                />
              </TableCell>

              {/* Rank Column */}
              <TableCell sx={{ fontWeight: 700, minWidth: 90 }}>
                <TableSortLabel
                  active={sortField === 'rank'}
                  direction={sortField === 'rank' ? sortOrder : 'asc'}
                  onClick={() => handleRequestSort('rank')}
                >
                  Rank
                </TableSortLabel>
              </TableCell>

              {/* Name Column */}
              <TableCell sx={{ fontWeight: 700, minWidth: 160 }}>
                <TableSortLabel
                  active={sortField === 'name'}
                  direction={sortField === 'name' ? sortOrder : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name (Last, First)
                </TableSortLabel>
              </TableCell>

              {/* EDIPI Column */}
              <TableCell sx={{ fontWeight: 700, minWidth: 110 }}>
                <TableSortLabel
                  active={sortField === 'edipi'}
                  direction={sortField === 'edipi' ? sortOrder : 'asc'}
                  onClick={() => handleRequestSort('edipi')}
                >
                  EDIPI
                </TableSortLabel>
              </TableCell>

              {/* CBT Course Columns */}
              {COURSES.map((course) => (
                <TableCell key={course.courseCode} align="center" sx={{ fontWeight: 700, minWidth: 110 }}>
                  <TableSortLabel
                    active={sortField === course.courseCode}
                    direction={sortField === course.courseCode ? sortOrder : 'asc'}
                    onClick={() => handleRequestSort(course.courseCode)}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 700, display: 'block' }}>
                      {course.courseCode}
                    </Typography>
                  </TableSortLabel>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', display: 'block' }}>
                    {course.courseTitle}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRoster.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4 + COURSES.length} align="center" sx={{ py: 6 }}>
                  <Typography variant="body1" color="text.secondary">
                    No Airmen records found matching the current search / filter criteria for {selectedSquadron}.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredRoster.map((row) => {
                const isSelected = selectedAirmanIds.includes(row.airman.uid);

                return (
                  <TableRow
                    key={row.airman.uid}
                    hover
                    selected={isSelected}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isSelected}
                        onChange={() => dispatch(toggleSelectAirman(row.airman.uid))}
                        inputProps={{ 'aria-label': `select ${row.airman.lastName}` }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>
                      {row.airman.rank}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        cursor: 'pointer',
                        color: 'primary.main',
                        transition: 'color 0.15s ease',
                        '&:hover': {
                          textDecoration: 'underline',
                          color: 'primary.dark',
                        },
                      }}
                      onClick={() => dispatch(openAirmanProfileModal(row.airman.uid))}
                      title="Click to view full printable training record"
                    >
                      {row.airman.lastName}, {row.airman.firstName}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      {row.airman.edipi}
                    </TableCell>

                    {COURSES.map((course) => {
                      const detail = row.courses[course.courseCode];
                      return (
                        <TableCell key={course.courseCode} align="center" sx={{ px: 1 }}>
                          <StatusBadge
                            detail={detail}
                            onClick={() =>
                              dispatch(
                                openCellModal({
                                  airmanId: row.airman.uid,
                                  courseCode: course.courseCode,
                                })
                              )
                            }
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Encapsulated Child Modals */}
      <LogCompletionModal />
      <AirmanProfileModal />
    </>
  );
}
